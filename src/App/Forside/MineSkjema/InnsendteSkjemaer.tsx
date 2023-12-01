import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../../types/permitteringsskjema";
import {Box, Heading, LinkPanel, Tag, VStack} from "@navikt/ds-react";
import {formatDate} from "../../../utils/date-utils";
import {loggTrykketPaTidligereSkjema} from "../../../utils/funksjonerForAmplitudeLogging";
import './MineSkjema.css';


export const InnsendteSkjemaer: FunctionComponent<{ skjemaer: Permitteringsskjema[] | undefined }> = ({skjemaer}) => {
    return (skjemaer === undefined || skjemaer.length === 0)
        ? null
        : <Box
            background="bg-default"
            padding={{xs: '2', md: '4', lg: '8'}}
            borderRadius="small"
        >
            <Heading level="2" size="large" spacing>
                Innsendte skjemaer
            </Heading>
            <VStack gap="4">
                {skjemaer
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
    const skjemaType = skjemaTekster[skjema.type];
    const lenke = `/permittering/skjema/kvitteringsside/${skjema.id}`;

    // TODO sendtInnTidspunkt not nullable, remove default new Date
    const innsendt = formatDate(new Date(skjema.sendtInnTidspunkt ? skjema.sendtInnTidspunkt : new Date()));

    return <LinkPanel href={lenke} className="skjemapanel" key={skjema.id} border onClick={() =>
        loggTrykketPaTidligereSkjema('Sendt inn')
    }>
        <LinkPanel.Title>{skjemaType}</LinkPanel.Title>
        <LinkPanel.Description className="skjemapanel-description">

            {skjema.bedriftNavn} (org.nr {skjema.bedriftNr})
            <Tag variant="success">Sendt inn: {innsendt}</Tag>
        </LinkPanel.Description>
    </LinkPanel>
}