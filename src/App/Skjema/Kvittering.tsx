import React, {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import {Alert, Box, Heading, HStack, LinkPanel, VStack} from "@navikt/ds-react";
import {Oppsummeringsfelter} from "../komponenter/Oppsummeringsfelter";
import {FileCheckmarkFillIcon} from "@navikt/aksel-icons";
import {useHentSkjema} from "../../api/permittering-api";
import {Breadcrumbs} from "./Breadcrumbs";
import {Side} from "../Side";
import {sidetitler} from "./Skjema";

export const Kvittering: FunctionComponent = () => {
    const {skjemaId} = useParams();
    const {skjema, error} = useHentSkjema(skjemaId);

    if (!skjema || error) {
        return <Side tittel="Kvitteringsside">
            <Breadcrumbs />
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <Alert variant="error">Klarte ikke hente skjema akkurat nå! Prøv igjen om noen minutter.</Alert>
            </Box>
        </Side>
    }

    return (
        <Side tittel={sidetitler[skjema.type]}>
            <Breadcrumbs breadcrumb={{
                url: `/skjema/${skjema.type}`,
                title: sidetitler[skjema.type]
            }}/>
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
            </VStack>
        </Side>


    );
}