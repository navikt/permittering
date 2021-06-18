import React, { useState } from 'react';

import { Input, InputProps } from 'nav-frontend-skjema';
import { erGyldigEpost } from '../../../utils/inputFeltValideringer';

const InputEpost: React.FunctionComponent<InputProps> = (props) => {
    const { onChange, ...other } = props;
    const [feilMelding, setFeilmelding] = useState('');
    return (
        <Input
            label="E-post"
            feil={feilMelding}
            onBlur={(event) => {
                if (erGyldigEpost(event.currentTarget.value)) {
                    if (onChange) {
                        onChange(event);
                    }
                    setFeilmelding('');
                } else {
                    setFeilmelding('Vennligst oppgi en gyldig e-post');
                }
            }}
            onChange={() => setFeilmelding('')}
            {...other}
        />
    );
};

export default InputEpost;
