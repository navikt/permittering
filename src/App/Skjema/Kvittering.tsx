import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, FormSummary, Heading, HStack, LinkPanel, Skeleton, VStack } from '@navikt/ds-react';
import { Oppsummeringsfelter } from '../komponenter/Oppsummeringsfelter';
import { FileCheckmarkFillIcon } from '@navikt/aksel-icons';
import { useHentSkjema } from '../../api/permittering-api';
import { Breadcrumbs } from './Breadcrumbs';
import { Side } from '../Side';
import { headings, labels, sidetitler } from './Skjema';
import { loggNavigasjon } from '../../utils/funksjonerForAmplitudeLogging';
import { formatDate } from '../../utils/date-utils';

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
                <VStack gap="8">
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">
                                Innsendte opplysninger
                            </FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Underenhet</FormSummary.Label>
                                <FormSummary.Value>
                                    <FormSummary.Answers>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Navn</FormSummary.Label>
                                            <FormSummary.Value>
                                                <Skeleton variant="rectangle" width="100%" />
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Org.nr.</FormSummary.Label>
                                            <FormSummary.Value>
                                                <Skeleton variant="rectangle" width="100%" />
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                    </FormSummary.Answers>
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            <FormSummary.Answer>
                                <FormSummary.Label>Kontaktperson i virksomheten</FormSummary.Label>
                                <FormSummary.Value>
                                    <FormSummary.Answers>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Navn</FormSummary.Label>
                                            <FormSummary.Value><Skeleton variant="rectangle" width="100%" /></FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>E-post</FormSummary.Label>
                                            <FormSummary.Value><Skeleton variant="rectangle" width="100%" /></FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Telefon</FormSummary.Label>
                                            <FormSummary.Value><Skeleton variant="rectangle" width="100%" /></FormSummary.Value>
                                        </FormSummary.Answer>
                                    </FormSummary.Answers>
                                </FormSummary.Value>
                            </FormSummary.Answer>

                            <FormSummary.Answer>
                                <FormSummary.Label> </FormSummary.Label>
                                <FormSummary.Value>
                                    <FormSummary.Answers>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Antall berørte</FormSummary.Label>
                                            <FormSummary.Value><Skeleton variant="rectangle" width="100%" /></FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>
                                            </FormSummary.Label>
                                            <FormSummary.Value><Skeleton variant="rectangle" width="100%" /></FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Berørte yrkeskategorier</FormSummary.Label>
                                            <FormSummary.Value>
                                                <Skeleton variant="rectangle" width="100%" />
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>

                                            </FormSummary.Label>
                                            <FormSummary.Value>
                                                <Skeleton variant="rectangle" width="100%" />
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                    </FormSummary.Answers>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>Sendt inn til NAV</FormSummary.Label>
                                <FormSummary.Value>
                                    <Skeleton variant="rectangle" width="100%" />
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>

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
                <Oppsummeringsfelter skjema={skjema} tittel="Innsendte opplysninger" />
                <LinkPanel
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver"
                    onClick={() => {
                        loggNavigasjon(
                            'https://arbeidsgiver.nav.no/min-side-arbeidsgiver',
                            'Gå til Min Side – arbeidsgiver',
                            'skjema/kvitteringsside',
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
                            'skjema/kvitteringsside',
                        );
                    }}
                >
                    <LinkPanel.Title>Informasjon om permittering til arbeidsgiver</LinkPanel.Title>
                </LinkPanel>
            </VStack>
        </Side>
    );
};
