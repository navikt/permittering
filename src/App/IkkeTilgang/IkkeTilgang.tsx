import React, {FunctionComponent} from 'react';
import {BodyShort, Box, Heading, Link} from '@navikt/ds-react';
import {Breadcrumbs} from "../Skjema/Breadcrumbs";
import {Side} from "../Side";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import "./IkkeTilgang.css";

export const IkkeTilgang: FunctionComponent = () => {
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
                <div className="ikke_tilgang">

                    <InformationSquareIcon title="a11y-title" fontSize="2rem" className="ikke_tilgang__ikon"/>

                        <Heading level="2" size="medium" className="ikke_tilgang__header">
                            Du mangler rettigheter i Altinn
                        </Heading>
                        <BodyShort size="large" className="ikke_tilgang__tekst">
                            For å kunne sende inn skjemaet trenger du rettigheter i Altinn på virksomheten.
                        </BodyShort>
                        <Link href="https://www.altinn.no/hjelp/profil/roller-og-rettigheter/" className="ikke_tilgang__lenke">
                            Les mer om hvilke tilganger du trenger
                        </Link>
                </div>
            </Box>
        </Side>
    );
};
