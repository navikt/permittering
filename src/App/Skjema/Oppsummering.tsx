import React, { FunctionComponent, useEffect } from 'react';
import { Permitteringsskjema } from '../../types/Permitteringsskjema';
import { Alert, BodyLong, Button, GuidePanel, Heading, HStack, VStack } from '@navikt/ds-react';
import { Oppsummeringsfelter } from '../komponenter/Oppsummeringsfelter';
import { useLagreSkjema } from '../../api/permittering-api';
import { useNavigate } from 'react-router-dom';
import { useLoggKlikk } from '../../utils/funksjonerForAmplitudeLogging';
import { ArrowLeftIcon, PaperplaneIcon } from '@navikt/aksel-icons';

type Props = {
    skjema: Permitteringsskjema;
    onTilbake: (skjema: Permitteringsskjema) => void;
};

export const Oppsummering: FunctionComponent<Props> = ({ skjema, onTilbake }) => {
    const navigate = useNavigate();
    const { lagreSkjema, error } = useLagreSkjema({
        onSkjemaLagret: (skjema) => {
            navigate(`/skjema/kvitteringsside/${skjema.id}`);
        },
    });
    const logKlikk = useLoggKlikk();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Heading size="large" level="2">
                Er opplysningene riktige?
            </Heading>
            <VStack gap="8">
                <GuidePanel poster>
                    <BodyLong spacing>
                        Sjekk at alt er riktig før du sender inn meldingen til NAV. Du kan endre
                        opplysningene om nødvendig.
                    </BodyLong>
                    <BodyLong>
                        Alle i virksomheten med rettigheten "Innsyn i permittering- og
                        nedbemanningsmeldinger sendt til NAV" vil kunne se meldingen etter
                        innsending.
                    </BodyLong>
                </GuidePanel>
                {error && (
                    <Alert variant="error">
                        Klarte ikke sende inn skjema akkurat nå! Prøv igjen om noen minutter.
                    </Alert>
                )}
                <Oppsummeringsfelter skjema={skjema} />
                <HStack gap="18">
                    <Button
                        variant="secondary"
                        icon={<ArrowLeftIcon aria-hidden />}
                        iconPosition="left"
                        onClick={() => {
                            logKlikk('Tilbake', { type: skjema.type });
                            onTilbake(skjema);
                        }}
                    >
                        Tilbake
                    </Button>
                    <Button
                        variant="primary"
                        icon={<PaperplaneIcon aria-hidden />}
                        iconPosition="right"
                        onClick={() => {
                            logKlikk('Send inn', { type: skjema.type });
                            return lagreSkjema({ ...skjema, sendtInnTidspunkt: new Date() });
                        }}
                    >
                        Send inn
                    </Button>
                </HStack>
            </VStack>
        </>
    );
};
