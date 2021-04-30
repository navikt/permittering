import React, { FunctionComponent } from 'react';
import moment from 'moment';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import { Element } from 'nav-frontend-typografi';
import AttributtVisning from './AttributtVisning/AttributtVisning';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import './tidligereInnsendtSkjema.less';

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

    const redirectLenkeTilTidligereSkjema = (skjema: Permitteringsskjema) => {
        if (status(skjema) === 'Sendt inn') {
            return '/permittering/skjema/kvitteringsside';
        }
        if (status(skjema) === 'Påbegynt') {
            return '/permittering/skjema/kontaktinformasjon/' + skjema.id;
        }
        return '#';
    };

    return (
        <li className="tidligere-skjema__liste">
            <Lenkepanel
                tittelProps="normaltekst"
                href={redirectLenkeTilTidligereSkjema(props.tidligereSkjema)}
            >
                <Element className="tidligere-skjema__overskrift-kort">
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
        </li>
    );
};

export default TidligereInnsendtSkjema;
