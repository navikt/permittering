import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { DatePicker, useDatepicker } from '@navikt/ds-react';
import './Datovelger.css';

interface Props {
    overtekst: string;
    value?: Date;
    onChange: (event: any) => void;
    disabled?: boolean;
    skalVareEtter?: Date;
    skalVareFoer?: Date;
    tjenesteBestemtFeilmelding?: string;
}

const Datovelger: FunctionComponent<Props> = (props) => {
    const datepickernode = useRef<HTMLDivElement>(null);
    const knappRef = useRef<HTMLButtonElement>(null);
    const [feilmelding, setFeilMelding] = useState('');
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
        knappRef?.current?.focus();
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
        if (props.value && props.skalVareFoer && props.value < props.skalVareFoer) {
            setFeilMelding('');
        }
        if (props.value && props.skalVareEtter && props.value > props.skalVareEtter) {
            setFeilMelding('');
        }
    }, [props.skalVareEtter, props.skalVareFoer, props.value]);

    const { datepickerProps, inputProps } = useDatepicker({
        onDateChange: (date) => {
            if (date) {
                date.setHours(12);
                velgDato(date);
            }
        },
    });

    return (
        <div ref={datepickernode} className={'datofelt'}>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    value={props.value?.toLocaleDateString()}
                    label={props.overtekst}
                    disabled={props.disabled}
                    error={feilmelding}
                />
            </DatePicker>
        </div>
    );
};

const datoValidering = (day: Date, after?: Date, before?: Date) => {
    if (after) {
        if (day.getTime() < after.getTime()) {
            return 'Til-dato må være etter fra-dato';
        }
    }
    if (before) {
        if (day.getTime() >= before.getTime()) {
            return 'Fra-dato må være før til-dato';
        }
    }
    /*if (day.getTime() + 84400000 < new Date().getTime()) {
        return 'Kan ikke velge tilbake i tid';
    }*/
    return '';
};

export default Datovelger;
