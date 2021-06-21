import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { UnmountClosed } from 'react-collapse';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Input, Label } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';
import {
    datoValidering,
    LABELS,
    MONTHS,
    skrivOmDato,
    skrivOmDatoStreng,
    WEEKDAYS_LONG,
    WEEKDAYS_SHORT,
} from './datovelger-utils';
import kalender from './kalender.svg';
import './Datovelger.less';

interface Props {
    overtekst: string;
    value?: Date;
    onChange: (event: { currentTarget: { value: Date } }) => void;
    disabled?: boolean;
    skalVareEtter?: Date;
    skalVareFoer?: Date;
    className?: string;
    tjenesteBestemtFeilmelding?: string;
}

const Datovelger: FunctionComponent<Props> = (props) => {
    const datepickernode = useRef<HTMLDivElement>(null);
    const knappRef = useRef<HTMLButtonElement>(null);
    const [erApen, setErApen] = useState(false);
    const [editing, setEditing] = useState(false);
    const selectedDate: Date | undefined = props.value;
    const [tempDate, setTempDate] = useState(skrivOmDato(selectedDate));
    const [feilmelding, setFeilMelding] = useState('');

    const datovelgerId = guid();

    const tekstIInputfeltet = () => {
        if (!editing && !props.value) {
            return 'dd.mm.yyyy';
        }
        return editing ? tempDate : skrivOmDato(selectedDate);
    };

    const velgDato = (date: Date) => {
        props.onChange({
            currentTarget: {
                value: date,
            },
        });
        const nyFeilmelding = datoValidering(date, props.skalVareEtter, props.skalVareFoer);
        if (nyFeilmelding !== '') {
            setFeilMelding(nyFeilmelding);
        } else {
            setFeilMelding('');
        }
        setErApen(false);
        knappRef?.current?.focus();
    };

    const inputOnBlur = (event: any) => {
        setEditing(false);
        const newDato = skrivOmDatoStreng(event.currentTarget.value);
        if (newDato) {
            velgDato(newDato);
        } else if (tekstIInputfeltet() !== 'dd.mm.yyyy') {
            setFeilMelding('dd.mm.yyyy');
            setErApen(false);
        }
    };

    useEffect(() => {
        if (props.tjenesteBestemtFeilmelding?.length) {
            setFeilMelding(props.tjenesteBestemtFeilmelding);
        }
        if (props.disabled) {
            setFeilMelding('');
        }
    }, [props.tjenesteBestemtFeilmelding, props.disabled]);

    useEffect(() => {
        if (erApen) {
            setFeilMelding('');
        }
    }, [erApen]);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const node = datepickernode.current;
            // @ts-ignore
            if (node && node.contains(e.target as HTMLElement)) {
                return;
            }
            if (erApen) {
                setErApen(false);
                knappRef?.current?.focus();
            }
        };
        document.addEventListener('click', handleOutsideClick, false);
        return () => {
            document.removeEventListener('click', handleOutsideClick, false);
        };
    }, [erApen, setErApen]);

    return (
        <div ref={datepickernode} className={'datofelt ' + props.className}>
            <Label htmlFor={datovelgerId}>{props.overtekst}</Label>
            <div className={'datofelt__input-container'}>
                <Input
                    feil={feilmelding}
                    disabled={props.disabled}
                    id={datovelgerId}
                    aria-label="Skriv startdato:"
                    value={tekstIInputfeltet()}
                    className="datofelt__input"
                    onChange={(event) => {
                        setEditing(true);
                        setTempDate(event.currentTarget.value);
                    }}
                    onBlur={(event) => {
                        inputOnBlur(event);
                    }}
                />
                <button
                    aria-label={'Velg' + props.overtekst + ' dato'}
                    disabled={props.disabled}
                    className={'datofelt__knapp'}
                    onClick={() => setErApen(!erApen)}
                    ref={knappRef}
                >
                    <img alt={''} src={kalender} />
                </button>
            </div>
            <UnmountClosed isOpened={erApen}>
                <DayPicker
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setErApen(false);
                        }
                    }}
                    className={'datofelt__collapse'}
                    selectedDays={selectedDate || new Date()}
                    firstDayOfWeek={1}
                    onDayKeyDown={(date, modifiers, e) => {
                        if (e.key === 'Tab') {
                            setErApen(!erApen);
                        }
                    }}
                    onDayClick={(day: Date) => {
                        day.setHours(12);
                        velgDato(day);
                    }}
                    months={MONTHS['no']}
                    weekdaysLong={WEEKDAYS_LONG['no']}
                    weekdaysShort={WEEKDAYS_SHORT['no']}
                    labels={LABELS['no']}
                />
            </UnmountClosed>
        </div>
    );
};

export default Datovelger;
