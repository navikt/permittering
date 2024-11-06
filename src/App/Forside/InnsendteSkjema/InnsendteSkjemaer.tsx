import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../../types/Permitteringsskjema";
import {Alert, Box, Heading, HelpText, LinkPanel, Tag, VStack} from "@navikt/ds-react";
import {formatDate} from "../../../utils/date-utils";
import './InnsendteSkjema.css';
import {useHentAlleSkjema} from "../../../api/permittering-api";
import {antallSomBøtte, loggNavigasjon, useKomponentLastet} from "../../../utils/funksjonerForAmplitudeLogging";

export const InnsendteSkjemaer: FunctionComponent = () => {
    const {data: skjemaer, error} = useHentAlleSkjema();

    useKomponentLastet(
        'innsendte-skjemaer',
        skjemaer?.length > 0,
        {antallSkjemaer: antallSomBøtte(skjemaer?.length)},
        [skjemaer]
    )

    return <Box
        background="bg-default"
        padding={{xs: '4', sm: '4', md: '4', lg: '8'}}
        borderRadius="small"
    >
        <Heading className="innsendte_skjemaer_heading" level="2" size="large" spacing>
            Innsendte skjemaer
            <HelpText title="Hva vises her?">
                Her vises skjemaer du har tilgang til som er sendt inn til NAV de siste 2 årene.
            </HelpText>
        </Heading>
        <VStack gap="4">
            <Alert variant='info' style={{marginBottom: '12px'}}>
                <Heading spacing size="small" level="3">
                    Endring for regnskapsfører
                </Heading>
                Regnskapsføreren kan fortsatt sende inn skjemaene, men for å få tilgang til alle innsendte permitterings- og nedbemanningsskjemaer,
                må de få delegeret tilgangen "Innsyn i permitterings- og nedbemanningsmeldinger".
            </Alert>

            {error === undefined ? null : <Alert variant="error">Det skjedde en feil ved henting av skjemaer</Alert>}

            {skjemaer.map((skjema: Permitteringsskjema) => <SkjemaPanel skjema={skjema}/>)}
        </VStack>
    </Box>;
}

const skjemaTekster = {
    MASSEOPPSIGELSE: 'Masseoppsigelse',
    PERMITTERING_UTEN_LØNN: 'Permittering uten lønn',
    INNSKRENKNING_I_ARBEIDSTID: 'Innskrenkning i arbeidstid',
};

const SkjemaPanel: FunctionComponent<{
    skjema: Permitteringsskjema
}> = ({skjema}) => {
    const skjemaType = skjemaTekster[skjema.type];
    const lenke = `/permittering/skjema/kvitteringsside/${skjema.id}`;

    const innsendt = formatDate(skjema.sendtInnTidspunkt);

    return (
        <LinkPanel
            href={lenke}
            className="skjemapanel"
            key={skjema.id}
            border
            onClick={() => {
                loggNavigasjon(
                    "skjema/kvitteringsside",
                    skjema.type,
                    "Forside"
                );
            }}
        >
            <LinkPanel.Title>{skjemaType}</LinkPanel.Title>
            <LinkPanel.Description className="skjemapanel-description">

                {skjema.bedriftNavn} (org.nr {skjema.bedriftNr})
                <Tag variant="success">Sendt inn: {innsendt}</Tag>
            </LinkPanel.Description>
        </LinkPanel>
    )
}