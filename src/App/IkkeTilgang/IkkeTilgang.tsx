import React, {FunctionComponent} from 'react';
import {Alert, Box, Heading, VStack} from '@navikt/ds-react';
import {Breadcrumbs} from "../Skjema/Breadcrumbs";
import {Side} from "../Side";

export const IkkeTilgang: FunctionComponent = () => {
    return (
        <Side
            tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"
        >
            <Breadcrumbs/>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <VStack gap="12">
                    <Heading level="2" size="small">
                        Du har dessverre ikke tilgang til å fylle ut skjema om permittering
                    </Heading>
                    <Alert variant="warning">
                        For å fylle ut skjema kreves det at du har en rolle eller rettighet i virksomheten i
                        Altinn
                    </Alert>
                </VStack>
            </Box>
        </Side>
    );
};
