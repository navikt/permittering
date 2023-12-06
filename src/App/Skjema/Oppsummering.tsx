import React, {FunctionComponent, useEffect} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Alert, Box, Button, Heading, HStack, VStack} from "@navikt/ds-react";
import {Oppsummeringsfelter} from "../komponenter/Oppsummeringsfelter";
import {useLagreSkjema} from "../../api/permittering-api";
import {useNavigate} from "react-router-dom";

type Props = {
    skjema: Permitteringsskjema,
    onTilbake: (skjema: Permitteringsskjema) => void,
};

export const Oppsummering: FunctionComponent<Props> = (
    {
        skjema,
        onTilbake,
    }
) => {
    const navigate = useNavigate();
    const {lagreSkjema, error} = useLagreSkjema({
        onSkjemaLagret: (skjema) => {
            navigate(`/skjema/kvitteringsside/${skjema.id}`);
        }
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Heading size="large" level="2">Er opplysningene riktige?</Heading>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <VStack gap="4">
                    {error && <Alert variant="error">Klarte sende inn skjema akkurat nå! Prøv igjen om noen minutter.</Alert>}
                    <Oppsummeringsfelter skjema={skjema}/>
                    <Alert variant="info">
                        Alle med rettigheten "Innsyn i permittering- og nedbemanningsmeldinger sendt til NAV" vil kunne
                        se meldingen etter den er sendt inn.
                    </Alert>
                    <HStack gap="18">
                        <Button
                            variant="secondary"
                            onClick={() => onTilbake(skjema)}
                        >
                            Tilbake
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => lagreSkjema({...skjema, sendtInnTidspunkt: new Date()})}
                        >
                            Send inn
                        </Button>
                    </HStack>
                </VStack>

            </Box>
        </>
    );
}