import React, { FunctionComponent } from 'react';

import AttributtVisning from './AttributtVisning/AttributtVisning';
import './tidligereInnsendtSkjema.less';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import Element from 'nav-frontend-typografi/lib/element';
import moment from 'moment';

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
        <li className="tidligere-skjema">
            <ul className="tidligere-skjema__liste">
                <Lenkepanel
                    tittelProps={'normaltekst'}
                    href={'/permittering/skjema/kontaktinformasjon/' + props.tidligereSkjema.id}
                >
                    <Element className={'tidligere-skjema__overskrift-kort'}>
                        {lagTekstBasertPaSkjemaType(props.tidligereSkjema.type)}
                    </Element>
                    <AttributtVisning
                        attributt="Dato sendt inn"
                        attributtVerdi={
                            props.tidligereSkjema.sendtInnTidspunkt &&
                            moment(props.tidligereSkjema.sendtInnTidspunkt).format('L')
                        }
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
