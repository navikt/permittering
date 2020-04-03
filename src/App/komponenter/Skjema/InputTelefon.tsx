import React, { useState } from 'react';

import { Input, InputProps } from 'nav-frontend-skjema';
import { erGyldigTelefonNr } from '../../../utils/inputFeltValideringer';

const InputTelefon: React.FunctionComponent<InputProps> = props => {
    const { onChange, ...other } = props;
    const [feilMelding, setFeilmelding] = useState('');
    return (
        <Input
            label="Telefonnummer"
            feil={feilMelding}
            onBlur={(event: any) => {
                if (erGyldigTelefonNr(event.currentTarget.value) && onChange) {
                    const telefonNummer = event.currentTarget.value;
                    const riktigFormat = telefonNummer.substr(
                        telefonNummer.length - 8,
                        telefonNummer.length
                    );
                    const copiedEvent = Object.assign({}, event);
                    copiedEvent.currentTarget.value = riktigFormat;
                    onChange(copiedEvent);
                    setFeilmelding('');
                } else setFeilmelding('Vennligst oppgi et gyldig telefonnummer');
            }}
            onChange={() => setFeilmelding('')}
            {...other}
        />
    );
};

export default InputTelefon;
