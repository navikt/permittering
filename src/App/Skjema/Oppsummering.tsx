import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Alert, Box, Button, Heading, HStack, Label, VStack} from "@navikt/ds-react";
import {Oppsummeringsfelter} from "../komponenter/Oppsummeringsfelter";

// viser oppsummering før innsending. Ingen egen route
export const Oppsummering: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {
    return (
        <>
            <Heading size="large" level="2">Er opplysningene riktige?</Heading>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <VStack gap="4">
                    <Oppsummeringsfelter skjema={skjema}/>
                    <Alert variant="info">
                        Alle med rettigheten "Innsyn i permittering- og nedbemanningsmeldinger sendt til NAV" vil kunne
                        se meldingen etter den er sendt inn.
                    </Alert>
                    <HStack gap="18">
                        <Button variant="secondary">Tilbake</Button>
                        <Button variant="primary">Send inn</Button>
                    </HStack>
                </VStack>
                {
                    //TODO: Buttons må implementeres
                }
            </Box>
        </>
    );
}