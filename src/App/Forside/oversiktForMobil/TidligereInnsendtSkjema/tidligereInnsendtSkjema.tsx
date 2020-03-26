import React, { FunctionComponent } from 'react';

import AttributtVisning from './AttributtVisning/AttributtVisning';
import './tidligereInnsendtSkjema.less';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import Element from 'nav-frontend-typografi/lib/element';

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
                <Lenkepanel tittelProps={'normaltekst'} href={'hola'}>
                    <Element className={'arbeidsforhold__overskrift-kort'}>
                        {lagTekstBasertPaSkjemaType(props.tidligereSkjema.type)}
                    </Element>
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
                </Lenkepanel>
            </ul>
        </li>
    );
};

export default TidligereInnsendtSkjema;
