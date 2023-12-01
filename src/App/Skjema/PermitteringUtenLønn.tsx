import React, {FunctionComponent, useContext} from "react";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";
import {Box, VStack} from "@navikt/ds-react";
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {VirksomhetsvelgerWrapper} from "./VirksomhetsvelgerWrapper";


export const PermitteringUtenLønn: FunctionComponent = () => {
    const {organisasjon} = useContext(OrganisasjonsListeContext);

    return (
        <>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <VStack gap="4">
                    <VirksomhetsvelgerWrapper/>

                    {organisasjon.OrganizationNumber}
                </VStack>
            </Box>
        </>
    );
}

