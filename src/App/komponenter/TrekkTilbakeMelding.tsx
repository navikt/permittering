import { SkjemaType } from '../../types/Permitteringsskjema';
import { todayMidnight } from '../../utils/date-utils';
import { Button, Box, Heading, BodyShort, HStack, Alert, VStack, Loader } from '@navikt/ds-react';
import React, { Dispatch, SetStateAction } from 'react';
import { TrekkeMeldingSteg } from '../Skjema/Kvittering';
import { useLagreTrukket } from '../../api/permittering-api';
import { logger } from '../../utils/analytics';

const tekster: Record<
    SkjemaType,
    { idle: string; submittedHeading: string; submittedBody: string }
> = {
    PERMITTERING_UTEN_LØNN: {
        idle: 'Skal ikke permittere likevel',
        submittedHeading: 'Melding til Nav om permittering er trukket tilbake',
        submittedBody: 'Nav har nå fått beskjed at dere ikke skal permittere likevel.',
    },
    MASSEOPPSIGELSE: {
        idle: 'Skal ikke si opp likevel',
        submittedHeading: 'Melding til Nav om masseoppsigelse er trukket tilbake',
        submittedBody: 'Nav har nå fått beskjed at dere ikke skal si opp likevel.',
    },
    INNSKRENKNING_I_ARBEIDSTID: {
        idle: 'Skal ikke innskrenke arbeidstiden likevel',
        submittedHeading: 'Melding til Nav om innskrenkning i arbeidstid er trukket tilbake',
        submittedBody: 'Nav har nå fått beskjed at dere ikke skal innskrenke arbeidstiden likevel.',
    },
};

export const TrekkTilbakeMelding = ({
    startDato,
    skjemaType,
    trekkeMeldingSteg,
    setTrekkeMeldingSteg,
    skjemaId,
}: {
    startDato: Date;
    skjemaType: SkjemaType;
    trekkeMeldingSteg: TrekkeMeldingSteg;
    setTrekkeMeldingSteg: Dispatch<SetStateAction<TrekkeMeldingSteg>>;
    skjemaId: string;
}) => {
    if (startDato <= todayMidnight()) return null;

    const skjemaTekst = tekster[skjemaType];

    const { lagreTrukket, error, isMutating } = useLagreTrukket(() => {
        logger('skjema trukket', { skjemanavn: skjemaType });
        setTrekkeMeldingSteg('submitted');
    });

    if (trekkeMeldingSteg === 'submitted') {
        return (
            <Alert variant="success">
                <Heading size="small" level="2" spacing>
                    {skjemaTekst.submittedHeading}
                </Heading>
                <BodyShort spacing>{skjemaTekst.submittedBody}</BodyShort>
            </Alert>
        );
    }

    if (trekkeMeldingSteg === 'confirm') {
        const friendlyError = error?.message?.includes('allerede trukket')
            ? 'Meldingen er allerede trukket.'
            : error
            ? 'Klarte ikke trekke meldingen nå. Prøv igjen om litt.'
            : null;

        return (
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{ xs: '3', md: '6', lg: '8' }}
            >
                <VStack gap="4">
                    <Heading size="medium" level="2" spacing>
                        {skjemaTekst.idle}
                    </Heading>
                    <BodyShort spacing>Da gir du Nav beskjed gjennom å trekke meldingen.</BodyShort>
                    <HStack gap="4">
                        <Button
                            variant="primary"
                            onClick={() => lagreTrukket(skjemaId)}
                            disabled={isMutating}
                            loading={isMutating}
                        >
                            Trekk melding til Nav
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setTrekkeMeldingSteg('idle')}
                            disabled={isMutating}
                        >
                            Avbryt
                        </Button>
                    </HStack>
                    {friendlyError && <Alert variant="error">{friendlyError}</Alert>}
                </VStack>
            </Box>
        );
    }

    return (
        <Button variant="secondary" onClick={() => setTrekkeMeldingSteg('confirm')}>
            {skjemaTekst.idle}
        </Button>
    );
};
