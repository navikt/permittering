import React, {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Alert, Box, Button, Heading, HStack, Link, LinkPanel, VStack} from "@navikt/ds-react";
import {Oppsummeringsfelter} from "../komponenter/Oppsummeringsfelter";
import {FileCheckmarkFillIcon} from "@navikt/aksel-icons";

export const Kvittering: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {
    const {skjemaId} = useParams();
    // TODO: useSkjema swr med hent fra backend
    return (
        <VStack gap="4">
            <HStack align="center">
                <FileCheckmarkFillIcon title="a11y-title" fontSize="4rem" color="var(--a-green-500)"/>
                <Heading size="large" level="2">Kvittering på mottatt melding</Heading>
            </HStack>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <Oppsummeringsfelter skjema={skjema}/>
            </Box>
            <LinkPanel href={"/min-side-arbeidsgiver"} border>
                <LinkPanel.Title>Gå til Min Side – arbeidsgiver</LinkPanel.Title>
            </LinkPanel>
            <LinkPanel href={"/#"}>
                <LinkPanel.Title>Informasjon om permittering til arbeidsgiver</LinkPanel.Title>
            </LinkPanel>
            {
                //TODO: Sjekke at vi har rette lenker til LinkPanel!
            }
        </VStack>

    );
}