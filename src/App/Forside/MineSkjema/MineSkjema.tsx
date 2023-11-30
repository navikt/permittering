import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../../types/permitteringsskjema";
import {Box, Heading, LinkPanel, Tag, VStack} from "@navikt/ds-react";
import {formatDate} from "../../../utils/date-utils";
import {loggTrykketPaTidligereSkjema} from "../../../utils/funksjonerForAmplitudeLogging";
import './MineSkjema.css';


export const MineSkjema: FunctionComponent<{ skjema: Permitteringsskjema[] | undefined }> = ({skjema}) => {
    return (skjema === undefined || skjema.length === 0)
        ? null
        : <Box
            background="bg-default"
            padding="4"
            borderRadius="small"
        >
            <Heading level="3" size="medium" spacing>
                Dine skjema
            </Heading>
            <VStack gap="4">
                {skjema
                    .filter((skjema: Permitteringsskjema) => !skjema.avbrutt)
                    .map((skjema: Permitteringsskjema) => <SkjemaPanel skjema={skjema}/>)
                }
            </VStack>
        </Box>;
}

const skjemaTekster = {
    MASSEOPPSIGELSE: 'Masseoppsigelse',
    PERMITTERING_UTEN_LØNN: 'Permittering uten lønn',
    INNSKRENKNING_I_ARBEIDSTID: 'Innskrenkning i arbeidstid',
};

const SkjemaPanel: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {
    const status = skjema.sendtInnTidspunkt ? 'Sendt inn' : 'Påbegynt'
    const tagVariant = skjema.sendtInnTidspunkt ? 'success' : 'info'
    const skjemaType = skjemaTekster[skjema.type] ?? 'Ukjent';
    const lenke = skjema.sendtInnTidspunkt ? `/permittering/skjema/kvitteringsside/${skjema.id}` : `/permittering/skjema/kontaktinformasjon/${skjema.id}`;

    return <LinkPanel href={lenke} className="skjemapanel" key={skjema.id} border onClick={() =>
        loggTrykketPaTidligereSkjema(status)
    }>
        <LinkPanel.Title>{skjemaType}</LinkPanel.Title>
        <LinkPanel.Description className="skjemapanel-description">
            {skjema.sendtInnTidspunkt && formatDate(new Date(skjema.sendtInnTidspunkt))}
            {skjema.bedriftNavn} {skjema.bedriftNr}
            <Tag variant={tagVariant}>{status}</Tag>
        </LinkPanel.Description>
    </LinkPanel>
}