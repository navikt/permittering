import React, {useEffect} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {brukerLoggetPa} from '../utils/funksjonerForAmplitudeLogging';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import {OrganisasjonsListeProvider} from './OrganisasjonslisteProvider';
import {SkjemaProvider} from './Skjema/SkjemaContext/SkjemaContext';
import Side0 from './Skjema/Side0 -hvaSkalDuRapportere/HvaSkalDuRapportere';
import Side1 from './Skjema/Side1/Side1';
import Side2 from './Skjema/Side2/Side2';
import Oppsummering from './Skjema/Side4-oppsummering/Oppsummering';
import Kvitteirng from './Skjema/Kvitteringsside/Kvitteringsside';
import {gittMiljo} from "../utils/environment";
import {setBreadcrumbs} from "@navikt/nav-dekoratoren-moduler";

const urlTilMinSideArbeidsgiver = gittMiljo({
    prod: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/',
    dev: 'https://arbeidsgiver.intern.dev.nav.no/min-side-arbeidsgiver/',
    demo: 'https://arbeidsgiver.ekstern.dev.nav.no/min-side-arbeidsgiver/',
    other: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/',
});

function App() {
    useEffect(() => {
        brukerLoggetPa();
        setBreadcrumbs([
            { url: urlTilMinSideArbeidsgiver, title: 'Min side – arbeidsgiver', handleInApp: false },
            { url: '/', title: 'Permittering og oppsigelse', handleInApp: true },
        ]);
    }, []);

    const basePath = '/permittering';

    return (
        <div className="app">
            <LoginBoundary>
                <BrowserRouter basename={basePath}>

                    <Routes>
                        <Route
                            path="/"
                            element={<Forside/>}
                        />
                        <Route path="/skjema"
                               element={
                                   <OrganisasjonsListeProvider>
                                       <SkjemaProvider>
                                           <Outlet/>
                                       </SkjemaProvider>
                                   </OrganisasjonsListeProvider>
                               }>
                            <Route
                                path="start"
                                element={<Side0/>}
                            />
                            <Route
                                path="kontaktinformasjon/:id"
                                element={<Side1/>}
                            />
                            <Route
                                path="generelle-opplysninger/:id"
                                element={<Side2/>}
                            />
                            <Route
                                path="oppsummering/:id"
                                element={<Oppsummering/>}
                            />
                            <Route
                                path="kvitteringsside/:id"
                                element={<Kvitteirng/>}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
}

export default App;
