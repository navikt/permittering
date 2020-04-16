import React from 'react';
import { Route } from 'react-router-dom';
import { SkjemaProvider } from './SkjemaContext/SkjemaContext';
import Side0 from './Side0 -hvaSkalDuRapportere/HvaSkalDuRapportere';
import SideX from './SideX-kontaktinfo/Kontaktinfo';
import Side3 from './Side3-personer/InputAvPersoner';
import Side5 from './Side5-yrker/Yrkeskategorier';
import Oppsummering from './Side4-oppsummering/Oppsummering';
import Kvitteirng from './Kvitteringsside/Kvitteringsside';
import AntallBerorte from './OppgiAntallBerorte/OppgiAntallBerorte';

const PermitteringRoutes = () => {
    return (
        <>
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
            <Route exact path="/skjema/kvitteringsside">
                <Kvitteirng />
            </Route>
        </>
    );
};

export default PermitteringRoutes;
