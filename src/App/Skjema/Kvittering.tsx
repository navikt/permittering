import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Alert,
    BodyLong,
    Box,
    Button,
    ExpansionCard,
    FormSummary,
    HStack,
    Link,
    LinkPanel,
    Skeleton,
    VStack,
} from '@navikt/ds-react';
import { Oppsummeringsfelter } from '../komponenter/Oppsummeringsfelter';
import { useHentSkjema } from '../../api/permittering-api';
import { Breadcrumbs } from './Breadcrumbs';
import { Side } from '../Side';
import { sidetitler } from './Skjema';
import { logger } from '../../utils/analytics';
import { SkjemaType } from '../../types/Permitteringsskjema';
import { TrekkTilbakeMelding } from '../komponenter/TrekkTilbakeMelding';

export type TrekkeMeldingSteg = 'idle' | 'confirm' | 'submitted';

export const Kvittering: FunctionComponent = () => {
    const { skjemaId } = useParams();
    const { skjema, error } = useHentSkjema(skjemaId);
    const [trekkeMeldingSteg, setTrekkeMeldingSteg] = useState<TrekkeMeldingSteg>('idle');

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
        return <KvitteringLaster />;
    }

    const erTrukket = Boolean(skjema.trukketTidspunkt) || trekkeMeldingSteg === 'submitted';

    return (
        <Side tittel={sidetitler[skjema.type]}>
            <Breadcrumbs
                breadcrumb={{
                    url: `/skjema/kvitteringsside/${skjema.id}`,
                    title: sidetitler[skjema.type],
                }}
            />
            <VStack gap="8">
                {!erTrukket && skjema.id && (
                    <TrekkTilbakeMelding
                        skjemaType={skjema.type}
                        startDato={skjema.startDato}
                        trekkeMeldingSteg={trekkeMeldingSteg}
                        setTrekkeMeldingSteg={setTrekkeMeldingSteg}
                        skjemaId={skjema.id}
                    />
                )}
                <Oppsummeringsfelter
                    skjema={skjema}
                    tittel={`Innsendte opplysninger${erTrukket ? ' (trukket tilbake)' : ''}`}
                    erTrukket={erTrukket}
                />
                {skjema.type === SkjemaType.enum.PERMITTERING_UTEN_LØNN && (
                    <>
                        <ExpansionCard aria-label="Husk å rapportere permittering i A-meldingen">
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>
                                    Husk å rapportere permittering i A-meldingen
                                </ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    Opplysningene i A-meldingen oppdaterer Aa-registeret, som brukes
                                    av NAV og andre offentlige etater. Feil informasjon kan gi feil
                                    vurderinger.
                                </ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <HStack gap="8">
                                    <Button
                                        variant="tertiary"
                                        onClick={() =>
                                            (window.location.href =
                                                'https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/a-meldingen/veiledning/arbeidsforholdet/opplysninger-om-arbeidsforholdet/permittering/')
                                        }
                                    >
                                        Slik rapporterer du
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            (window.location.href =
                                                'https://arbeidsgiver.nav.no/arbeidsforhold/')
                                        }
                                    >
                                        Kontrollere info i Aa-reg
                                    </Button>
                                </HStack>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                        <ExpansionCard aria-label={'Del informasjon til berørte ansatte'}>
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>
                                    Del informasjon til berørte ansatte
                                </ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    Her finner du nyttig informasjon om hvordan man søker dagpenger,
                                    sender meldekort og registrer seg som arbeidssøker.
                                </ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <VStack gap="8">
                                    <BodyLong>
                                        Denne filmen viser vi hva det vil si å være permittert,
                                        plikter og rettigheter:{' '}
                                        <span>
                                            <Link
                                                href={
                                                    'https://player.vimeo.com/video/566520073?h=79f8d36395%22'
                                                }
                                            >
                                                https://player.vimeo.com/video/566520073?h=79f8d36395%22
                                            </Link>
                                        </span>
                                    </BodyLong>
                                    <BodyLong>
                                        Her finner du mye god skriftlig informasjon om det å bli
                                        permittert eller nedbemanne:{' '}
                                        <span>
                                            <Link
                                                href={'https://www.nav.no/arbeidsledig-permittert'}
                                            >
                                                Er arbeidsledig eller permittert - nav.no
                                            </Link>
                                        </span>
                                    </BodyLong>
                                </VStack>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </>
                )}
                <LinkPanel
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver"
                    onClick={() => {
                        logger('navigere', {
                            destinasjon: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver',
                            lenketekst: 'Gå til Min Side – arbeidsgiver',
                        });
                    }}
                >
                    <LinkPanel.Title>Gå til Min Side – arbeidsgiver</LinkPanel.Title>
                </LinkPanel>
                <LinkPanel
                    href="https://www.nav.no/arbeidsgiver/permittere"
                    onClick={() => {
                        logger('navigere', {
                            destinasjon: 'https://www.nav.no/arbeidsgiver/permittere',
                            lenketekst: 'Informasjon om permittering til arbeidsgiver',
                        });
                    }}
                >
                    <LinkPanel.Title>Informasjon om permittering til arbeidsgiver</LinkPanel.Title>
                </LinkPanel>
            </VStack>
        </Side>
    );
};

const KvitteringLaster = () => (
    <Side tittel="Laster kvittering">
        <Breadcrumbs />
        <VStack gap="8">
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Innsendte opplysninger</FormSummary.Heading>
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
                                    <FormSummary.Value>
                                        <Skeleton variant="rectangle" width="100%" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>E-post</FormSummary.Label>
                                    <FormSummary.Value>
                                        <Skeleton variant="rectangle" width="100%" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Telefon</FormSummary.Label>
                                    <FormSummary.Value>
                                        <Skeleton variant="rectangle" width="100%" />
                                    </FormSummary.Value>
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
                                    <FormSummary.Value>
                                        <Skeleton variant="rectangle" width="100%" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>{''}</FormSummary.Label>
                                    <FormSummary.Value>
                                        <Skeleton variant="rectangle" width="100%" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Berørte yrkeskategorier</FormSummary.Label>
                                    <FormSummary.Value>
                                        <Skeleton variant="rectangle" width="100%" />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>{''}</FormSummary.Label>
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
