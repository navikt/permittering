import React from 'react';
import {BodyShort, Box, Button, Heading, Link, VStack} from '@navikt/ds-react';
import {Breadcrumbs} from "../Skjema/Breadcrumbs";
import {Side} from "../Side";
import './LoggInn.css';


const lokalKjoring = () => {
    return window.location.hostname === 'localhost';
};

export const redirectTilLogin = () => {
    lokalKjoring()
        ? (window.location.href =
            'http://localhost:8080/permitteringsskjema-api/auth/mock-token?redirect=http://localhost:3000/permittering')
        : (window.location.href = '/permittering/redirect-til-login');
};

const LoggInn = () => {
    return (
        <Side
            tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"
        >
            <Breadcrumbs/>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '3', md: '6', lg: '12'}}
            >
                <VStack gap="8">
                    <Heading level="2" size="medium" className="logg_inn__header">
                        Meld fra til NAV
                    </Heading>

                    <BodyShort size="large" className="logg_inn__tekst">
                        Arbeidsgivers meldeplikt til NAV ved masseoppsigelser, permittering uten lønn og
                        innskrenkning i arbeidstid.
                    </BodyShort>

                    <Button onClick={redirectTilLogin} type="button">
                        Logg inn
                    </Button>

                    <div>
                        <BodyShort>
                            Ønsker du å se dine tjenester som privatperson?
                        </BodyShort>
                        <Link href="https://www.nav.no/person/dittnav/">
                            Logg inn på Ditt NAV
                        </Link>
                    </div>
                </VStack>
            </Box>
        </Side>
    );
};

export default LoggInn;
