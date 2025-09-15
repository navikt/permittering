import React, { FunctionComponent, useEffect } from 'react';
import { Permitteringsskjema } from '../../types/Permitteringsskjema';
import { Alert, BodyLong, Button, GuidePanel, Heading, HStack, VStack } from '@navikt/ds-react';
import { Oppsummeringsfelter } from '../komponenter/Oppsummeringsfelter';
import { useLagreSkjema } from '../../api/permittering-api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { logger } from '../../utils/analytics';

type Props = {
    skjema: Permitteringsskjema;
    onTilbake: (skjema: Permitteringsskjema) => void;
};

export const Oppsummering: FunctionComponent<Props> = ({ skjema, onTilbake }) => {
    const navigate = useNavigate();
    const { lagreSkjema, error, isMutating } = useLagreSkjema({
        onSkjemaLagret: (skjema) => {
            logger('skjema fullført', { skjemanavn: skjema.type });
            navigate(`/skjema/kvitteringsside/${skjema.id}`);
        },
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <VStack gap="8" aria-busy={isMutating}>
                <GuidePanel poster>
                    <BodyLong spacing>
                        Sjekk at alt er riktig før du sender inn meldingen til NAV. Du kan endre
                        opplysningene om nødvendig.
                    </BodyLong>
                    <BodyLong>
                        Alle i virksomheten med rettigheten "Innsyn i permittering- og
                        nedbemanningsmeldinger" vil kunne se meldingen etter innsending.
                    </BodyLong>
                </GuidePanel>
                {error && (
                    <Alert variant="error">
                        Klarte ikke sende inn skjema akkurat nå! Prøv igjen om noen minutter.
                    </Alert>
                )}
                <Oppsummeringsfelter skjema={skjema} tittel="Er opplysningene riktig?" />
                <HStack gap="18">
                    <Button
                        variant="secondary"
                        icon={<ArrowLeftIcon aria-hidden />}
                        iconPosition="left"
                        disabled={isMutating}
                        onClick={() => onTilbake(skjema)}
                    >
                        Tilbake
                    </Button>
                    <Button
                        variant="primary"
                        icon={<PaperplaneIcon aria-hidden />}
                        iconPosition="right"
                        loading={isMutating}
                        disabled={isMutating}
                        onClick={() => lagreSkjema({ ...skjema, sendtInnTidspunkt: new Date() })}
                    >
                        Send inn
                    </Button>
                </HStack>
            </VStack>
        </>
    );
};
