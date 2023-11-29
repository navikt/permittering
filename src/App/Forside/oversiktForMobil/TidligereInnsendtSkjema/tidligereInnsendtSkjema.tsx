import React, { FunctionComponent } from 'react';
import { LinkPanel } from '@navikt/ds-react';
import AttributtVisning from './AttributtVisning/AttributtVisning';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import './tidligereInnsendtSkjema.css';
import {formatDate} from "../../../../utils/date-utils";

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

const TidligereInnsendtSkjema: FunctionComponent<Props> = (props) => {
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
            return '/permittering/skjema/kvitteringsside/' + skjema.id;
        }
        if (status(skjema) === 'Påbegynt') {
            return '/permittering/skjema/kontaktinformasjon/' + skjema.id;
        }
        return '#';
    };

    return (
        <li className="tidligere-skjema__liste">
            <LinkPanel href={redirectLenkeTilTidligereSkjema(props.tidligereSkjema)}>
                <LinkPanel.Title className="tidligere-skjema__overskrift-kort">
                    {lagTekstBasertPaSkjemaType(props.tidligereSkjema.type)}
                </LinkPanel.Title>
                <LinkPanel.Description>
                    <AttributtVisning
                        attributt="Dato sendt inn"
                        attributtVerdi={
                            props.tidligereSkjema.sendtInnTidspunkt &&
                            formatDate(new Date(props.tidligereSkjema.sendtInnTidspunkt))
                        }
                    />
                    <AttributtVisning
                        attributt="Virksomhetsnummer"
                        attributtVerdi={props.tidligereSkjema.bedriftNr}
                    />
                    <AttributtVisning
                        attributt="Status"
                        attributtVerdi={status(props.tidligereSkjema)}
                    />
                </LinkPanel.Description>
            </LinkPanel>
        </li>
    );
};

export default TidligereInnsendtSkjema;
