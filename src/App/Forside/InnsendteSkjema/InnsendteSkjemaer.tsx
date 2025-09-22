import React, { FunctionComponent } from 'react';
import { Permitteringsskjema } from '../../../types/Permitteringsskjema';
import { Alert, Box, Heading, HelpText, LinkPanel, Tag, VStack } from '@navikt/ds-react';
import { formatDate } from '../../../utils/date-utils';
import './InnsendteSkjema.css';
import { useHentAlleSkjema } from '../../../api/permittering-api';
import { logger } from '../../../utils/analytics';

export const InnsendteSkjemaer: FunctionComponent = () => {
    const { data: skjemaer, error } = useHentAlleSkjema();

    if (skjemaer?.length > 0) {
        logger('innsendte-skjemaer', {
            antallSkjemaer: skjemaer?.length,
        });
    }

    return (
        <Box
            background="bg-default"
            padding={{ xs: '4', sm: '4', md: '4', lg: '8' }}
            borderRadius="small"
        >
            <Heading className="innsendte_skjemaer_heading" level="2" size="large" spacing>
                Innsendte skjemaer
                <HelpText title="Hva vises her?">
                    Her vises skjemaer du har tilgang til som er sendt inn til NAV de siste 2 årene.
                </HelpText>
            </Heading>
            <VStack gap="4">
                {error === undefined ? null : (
                    <Alert variant="error">Det skjedde en feil ved henting av skjemaer</Alert>
                )}

                {skjemaer.map((skjema: Permitteringsskjema) => (
                    <SkjemaPanel skjema={skjema} />
                ))}
            </VStack>
        </Box>
    );
};

const skjemaTekster = {
    MASSEOPPSIGELSE: 'Masseoppsigelse',
    PERMITTERING_UTEN_LØNN: 'Permittering uten lønn',
    INNSKRENKNING_I_ARBEIDSTID: 'Innskrenkning i arbeidstid',
};

const SkjemaPanel: FunctionComponent<{
    skjema: Permitteringsskjema;
}> = ({ skjema }) => {
    const skjemaType = skjemaTekster[skjema.type];
    const lenke = `/permittering/skjema/kvitteringsside/${skjema.id}`;

    const erTrukket = Boolean(skjema.trukketTidspunkt);
    const trukketDato = erTrukket ? formatDate(skjema.trukketTidspunkt) : null;
    const innsendtDato = formatDate(skjema.sendtInnTidspunkt);

    return (
        <LinkPanel
            href={lenke}
            className="skjemapanel"
            key={skjema.id}
            border
            onClick={() =>
                logger('navigere', {
                    destinasjon: 'skjema/kvitteringsside',
                    lenketekst: skjema.type,
                })
            }
        >
            <LinkPanel.Title>{skjemaType}</LinkPanel.Title>
            <LinkPanel.Description className="skjemapanel-description">
                {skjema.bedriftNavn} (org.nr {skjema.bedriftNr})
                {erTrukket ? (
                    <Tag variant="neutral">Trukket: {trukketDato}</Tag>
                ) : (
                    <Tag variant="success">Sendt inn: {innsendtDato}</Tag>
                )}
            </LinkPanel.Description>
        </LinkPanel>
    );
};
