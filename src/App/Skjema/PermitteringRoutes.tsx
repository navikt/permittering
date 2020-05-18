import React from 'react';
import { Route } from 'react-router-dom';
import { OrganisasjonsListeProvider } from '../OrganisasjonslisteProvider';
import Kvitteirng from './Kvitteringsside/Kvitteringsside';
import Side0 from './Side0 -hvaSkalDuRapportere/HvaSkalDuRapportere';
import SideX from './SideX-kontaktinfo/Kontaktinfo';
import Side3 from './Side3-personer/InputAvPersoner';
import Side5 from './Side5-yrker/Yrkeskategorier';
import { SkjemaProvider } from './SkjemaContext/SkjemaContext';
import Oppsummering from './Side4-oppsummering/Oppsummering';
import AntallBerorte from './OppgiAntallBerorte/OppgiAntallBerorte';
import Side2 from './Side2/Side2';

const PermitteringRoutes = () => {
    return (
        <>
            <Route path="/skjema">
                <OrganisasjonsListeProvider>
                    <Route exact path="/skjema/start">
                        <SkjemaProvider>
                            <Side0 />
                        </SkjemaProvider>
                    </Route>
                    <Route exact path="/skjema/antall-berorte/:id">
                        <SkjemaProvider>
                            <AntallBerorte />
                        </SkjemaProvider>
                    </Route>
                    <Route exact path="/skjema/generelle-opplysninger/:id">
                        <SkjemaProvider>
                            <Side2 />
                        </SkjemaProvider>
                    </Route>
                    <Route exact path="/skjema/kontaktinformasjon/:id">
                        <SkjemaProvider>
                            <SideX />
                        </SkjemaProvider>
                    </Route>
                    <Route exact path="/skjema/hvem-rammes/:id">
                        <SkjemaProvider>
                            <Side3 />
                        </SkjemaProvider>
                    </Route>
                    <Route exact path="/skjema/yrkeskategorier/:id">
                        <SkjemaProvider>
                            <Side5 />
                        </SkjemaProvider>
                    </Route>
                    <Route exact path="/skjema/oppsummering/:id">
                        <SkjemaProvider>
                            <Oppsummering />
                        </SkjemaProvider>
                    </Route>

                    <Route exact path="/skjema/kvitteringsside/:id">
                        <SkjemaProvider>
                            <Kvitteirng />
                        </SkjemaProvider>
                    </Route>
                </OrganisasjonsListeProvider>
            </Route>
        </>
    );
};

export default PermitteringRoutes;
