import React, {FunctionComponent, Ref} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Alert, Box, Button, Heading, HStack, Label, VStack} from "@navikt/ds-react";
import {Oppsummeringsfelter} from "../komponenter/Oppsummeringsfelter";

type Props = {
    ref?: Ref<HTMLHeadingElement>,
    skjema: Permitteringsskjema,
    onSendInn?: (skjema: Permitteringsskjema) => void,
    onTilbake?: (skjema: Permitteringsskjema) => void,
};

export const Oppsummering: FunctionComponent<Props> = (
    {
        ref,
        skjema,
        onTilbake = () => {},
        onSendInn = () => {},
    }
) => {
    return (
        <>
            <Heading ref={ref} size="large" level="2">Er opplysningene riktige?</Heading>
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
                        <Button variant="secondary" onClick={() => onTilbake(skjema)}>Tilbake</Button>
                        <Button variant="primary" onClick={() => onSendInn(skjema)}>Send inn</Button>
                    </HStack>
                </VStack>

            </Box>
        </>
    );
}