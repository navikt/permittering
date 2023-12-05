import React, {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import {Box, Heading, HStack, LinkPanel, VStack} from "@navikt/ds-react";
import {Oppsummeringsfelter} from "../komponenter/Oppsummeringsfelter";
import {FileCheckmarkFillIcon} from "@navikt/aksel-icons";
import {useHentSkjema} from "../../api/permittering-api";
import {Breadcrumbs} from "./Breadcrumbs";
import {Side} from "../Side";
import {sidetitler} from "./Skjema";

export const Kvittering: FunctionComponent = () => {
    const {skjemaId} = useParams();
    const {skjema, error} = useHentSkjema(skjemaId);

    // TODO: vis feilmelding hvis error
    if (!skjema || error) {
        return null;
    }

    return (
        <Side tittel={sidetitler[skjema.type]}>
            <Breadcrumbs breadcrumb={{
                url: '/skjema/INNSKRENKNING_I_ARBEIDSTID',
                title: 'Innskrenkning i arbeidstid'
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
                {
                    //TODO: Sjekke at vi har rette lenker til LinkPanel!
                }
            </VStack>
        </Side>


    );
}