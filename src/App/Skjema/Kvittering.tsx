import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Heading, HStack, LinkPanel, Skeleton, VStack } from '@navikt/ds-react';
import { Oppsummeringsfelter } from '../komponenter/Oppsummeringsfelter';
import { FileCheckmarkFillIcon } from '@navikt/aksel-icons';
import { useHentSkjema } from '../../api/permittering-api';
import { Breadcrumbs } from './Breadcrumbs';
import { Side } from '../Side';
import { sidetitler } from './Skjema';
import { loggNavigasjon } from '../../utils/funksjonerForAmplitudeLogging';

export const Kvittering: FunctionComponent = () => {
    const { skjemaId } = useParams();
    const { skjema, error } = useHentSkjema(skjemaId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (error) {
        return (
            <Side tittel="Kvitteringsside">
                <Breadcrumbs />
                <Box
                    background="bg-default"
                    borderRadius="small"
                    padding={{ xs: '4', sm: '4', md: '4', lg: '8' }}
                >
                    <Alert variant="error">
                        Klarte ikke hente skjema akkurat nå! Prøv igjen om noen minutter.
                    </Alert>
                </Box>
            </Side>
        );
    }

    if (!skjema) {
        return (
            <Side tittel="Laster kvittering">
                <Breadcrumbs />
                <VStack gap="4">
                    <HStack align="center">
                        <FileCheckmarkFillIcon
                            title="Filikon med hake"
                            aria-hidden="true"
                            fontSize="4rem"
                            color="var(--a-green-500)"
                        />
                        <Heading as={Skeleton} size="large" level="2">
                            Kvittering på mottatt melding
                        </Heading>
                    </HStack>
                    <VStack gap="4">
                        <Skeleton variant="rectangle" width="100%" />
                        <Skeleton variant="rectangle" width="100%" />
                        <div className="oppsummering_linje" />

                        <Skeleton variant="rectangle" width="100%" />
                        <Skeleton variant="rectangle" width="100%" />
                        <Skeleton variant="rectangle" width="100%" />
                        <div className="oppsummering_linje" />

                        <Skeleton variant="rectangle" width="100%" />
                        <div className="oppsummering_linje" />

                        <Skeleton variant="rectangle" width="100%" />
                        <div className="oppsummering_linje" />

                        <Skeleton variant="rectangle" width="100%" />
                        <div className="oppsummering_linje" />

                        <Skeleton variant="rectangle" width="100%" />
                        <div className="oppsummering_linje" />

                        <Skeleton variant="rectangle" width="100%" height="8vh" />
                    </VStack>

                    <Skeleton variant="rectangle" width="100%" height="8vh" />
                    <Skeleton variant="rectangle" width="100%" height="8vh" />
                </VStack>
            </Side>
        );
    }

    return (
        <Side tittel={sidetitler[skjema.type]}>
            <Breadcrumbs
                breadcrumb={{
                    url: `/skjema/kvitteringsside/${skjema.id}`,
                    title: sidetitler[skjema.type],
                }}
            />
            <VStack gap="8">
                <HStack align="center">
                    <FileCheckmarkFillIcon
                        title="a11y-title"
                        fontSize="4rem"
                        color="var(--a-green-500)"
                    />
                    <Heading size="large" level="2">
                        Kvittering på mottatt melding
                    </Heading>
                </HStack>
                <Oppsummeringsfelter skjema={skjema} />
                <LinkPanel
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver"
                    onClick={() => {
                        loggNavigasjon(
                            'https://arbeidsgiver.nav.no/min-side-arbeidsgiver',
                            'Gå til Min Side – arbeidsgiver',
                            'skjema/kvitteringsside'
                        );
                    }}
                >
                    <LinkPanel.Title>Gå til Min Side – arbeidsgiver</LinkPanel.Title>
                </LinkPanel>
                <LinkPanel
                    href="https://www.nav.no/arbeidsgiver/permittere"
                    onClick={() => {
                        loggNavigasjon(
                            'https://www.nav.no/arbeidsgiver/permittere',
                            'Informasjon om permittering til arbeidsgiver',
                            'skjema/kvitteringsside'
                        );
                    }}
                >
                    <LinkPanel.Title>Informasjon om permittering til arbeidsgiver</LinkPanel.Title>
                </LinkPanel>
            </VStack>
        </Side>
    );
};
