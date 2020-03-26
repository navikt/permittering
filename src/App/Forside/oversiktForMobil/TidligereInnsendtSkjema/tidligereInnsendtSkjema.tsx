import React, { FunctionComponent } from 'react';

import AttributtVisning from './AttributtVisning/AttributtVisning';
import './tidligereInnsendtSkjema.less';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';

const status = (skjema: Permitteringsskjema) => {
    if (skjema.sendtInnTidspunkt) {
        return 'Sendt inn';
    } else {
        return 'Påbegynt';
    }
};

interface Props {
    className?: string;
    tidligereSkjema: Permitteringsskjema;
    key: string;
}

const TidligereInnsendtSkjema: FunctionComponent<Props> = props => {
    const lagTekstBasertPaSkjemaType = (type: Permitteringsskjema['type']) => {
        switch (type) {
            case 'MASSEOPPSIGELSE':
                return 'Masseoppsigelse';
            case 'PERMITTERING_UTEN_LØNN':
                return 'Permittering uten lønn';
            case 'INNSKRENKNING_I_ARBEIDSTID':
                return 'Innskrenkning i arbeidstid';
        }
        return 'Ukjent';
    };

    return (
        <li className="arbeidsforhold">
            <ul className="arbeidsforhold__liste">
                <li className="attributt">
                    <div className="attributt__navn">Navn</div>
                    <div className="attributt__verdi"></div>
                </li>
                <AttributtVisning
                    attributt="Skjemaet gjelder"
                    attributtVerdi={lagTekstBasertPaSkjemaType(props.tidligereSkjema.type)}
                />
                <AttributtVisning
                    attributt="Dato sendt inn"
                    attributtVerdi={props.tidligereSkjema.sendtInnTidspunkt}
                />
                <AttributtVisning
                    attributt="Bedriftsnummer"
                    attributtVerdi={props.tidligereSkjema.bedriftNr}
                />
                <AttributtVisning
                    attributt="Status"
                    attributtVerdi={status(props.tidligereSkjema)}
                />
            </ul>
        </li>
    );
};

export default TidligereInnsendtSkjema;
