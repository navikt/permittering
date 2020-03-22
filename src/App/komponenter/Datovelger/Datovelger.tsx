import React, { FunctionComponent, useState } from 'react';
import { Collapse } from 'react-collapse';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Input from 'nav-frontend-skjema/lib/input';
import { Label } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';
import {
    datoValidering,
    LABELS,
    MONTHS,
    skrivOmDato,
    skrivOmDatoStreng,
    WEEKDAYS_LONG,
    WEEKDAYS_SHORT,
} from './datofunksjoner';
import kalender from './kalender.svg';
import './Datovelger.less';

interface Props {
    overtekst: string;
    value?: string;
    onChange: (event: any) => void;
    disabled?: boolean;
    skalVareEtter?: Date;
    skalVareFoer?: Date;
}

const Datovelger: FunctionComponent<Props> = props => {
    const [erApen, setErApen] = useState(false);
    const [editing, setEditing] = useState(false);
    const selectedDate = new Date(props.value || new Date());
    const [tempDate, setTempDate] = useState(skrivOmDato(selectedDate));
    const [feilmelding, setFeilMelding] = useState('');

    const datovelgerId = guid();

    const onDatoClick = (day: Date) => {
        const feilmelding = datoValidering(day, props.skalVareEtter, props.skalVareFoer);
        if (feilmelding !== '') {
            setFeilMelding(feilmelding);
        } else {
            props.onChange({
                currentTarget: {
                    value: day,
                },
            });
            setFeilMelding('');
        }
        setErApen(false);
    };

    const inputOnBlur = (event: any) => {
        setEditing(false);
        const newDato = skrivOmDatoStreng(event.currentTarget.value);
        if (newDato) {
            onDatoClick(newDato);
        } else {
            setFeilMelding('dd/mm/yyyy');
            setErApen(false);
        }
    };

    return (
        <div className={'datofelt'}>
            <Label htmlFor={datovelgerId}>{props.overtekst}</Label>
            <div className={'datofelt__input-container'}>
                <Input
                    feil={feilmelding}
                    disabled={props.disabled}
                    id={datovelgerId}
                    aria-label="Skriv startdato:"
                    value={editing ? tempDate : skrivOmDato(selectedDate)}
                    className={'datofelt__input'}
                    onChange={event => {
                        setEditing(true);
                        setTempDate(event.currentTarget.value);
                    }}
                    onBlur={event => {
                        inputOnBlur(event);
                    }}
                />
                <button
                    disabled={props.disabled}
                    className={'datofelt__knapp'}
                    onClick={() => setErApen(!erApen)}
                >
                    <img alt={''} src={kalender} />
                </button>
            </div>
            <Collapse isOpened={erApen}>
                <DayPicker
                    className={'datofelt__collapse'}
                    selectedDays={selectedDate}
                    month={selectedDate}
                    firstDayOfWeek={1}
                    onDayClick={day => onDatoClick(day)}
                    locale={'no'}
                    months={MONTHS['no']}
                    weekdaysLong={WEEKDAYS_LONG['no']}
                    weekdaysShort={WEEKDAYS_SHORT['no']}
                    labels={LABELS['no']}
                />
            </Collapse>
        </div>
    );
};

export default Datovelger;
