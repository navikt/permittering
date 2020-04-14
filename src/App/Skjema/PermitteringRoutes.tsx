import React from 'react';
import { Route } from 'react-router-dom';
import { SkjemaProvider } from './SkjemaContext/SkjemaContext';
import Side0 from './Side0 -hvaSkalDuRapportere/HvaSkalDuRapportere';
import Side1 from './Side1/Side1';
import Side2 from './Side2/Side2';
import Side3 from './Side3-personer/InputAvPersoner';
import Side5 from './Side5-yrker/Yrkeskategorier';
import Oppsummering from './Side4-oppsummering/Oppsummering';
import Kvitteirng from './Kvitteringsside/Kvitteringsside';
import AntallBerorte from './AntallBerorte/InputAvPersoner';

const PermitteringRoutes = () => {
    return (
        <>
            <Route exact path="/skjema/start">
                <SkjemaProvider>
                    <Side0 />
                </SkjemaProvider>
            </Route>
            <Route exact path="/skjema/kontaktinformasjon/:id">
                <SkjemaProvider>
                    <Side1 />
                </SkjemaProvider>
            </Route>
            <Route exact path="/skjema/generelle-opplysninger/:id">
                <SkjemaProvider>
                    <AntallBerorte />
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
