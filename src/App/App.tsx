import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import {OrganisasjonsListeProvider} from './OrganisasjonslisteProvider';
import {PermitteringUtenLønn} from "./Skjema/PermitteringUtenLønn";
import Banner from "./komponenter/Banner/Banner";
import {VStack} from "@navikt/ds-react";
import {Kvittering} from "./Skjema/Kvittering";
import {InnskrenkningIArbeidstid} from "./Skjema/InnskrenkningIArbeidstid";
import {Masseoppsigelse} from "./Skjema/Masseoppsigelse";

function App() {
    const basePath = '/permittering';

    return (
        <div className="app">
            <LoginBoundary>
                <BrowserRouter basename={basePath}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Banner/>
                                    <VStack gap="4" className="forside-container">
                                        <OrganisasjonsListeProvider>
                                            <Outlet/>
                                        </OrganisasjonsListeProvider>
                                    </VStack>
                                </>
                            }
                        >
                            <Route path="/" element={<Forside/>}/>
                            <Route path="/skjema">
                                <Route path="MASSEOPPSIGELSE" element={<Masseoppsigelse/>}/>
                                <Route path="PERMITTERING_UTEN_LØNN" element={<PermitteringUtenLønn/>}/>
                                <Route path="INNSKRENKNING_I_ARBEIDSTID" element={<InnskrenkningIArbeidstid/>}/>
                                <Route path="kvitteringsside/:skjemaId" element={<Kvittering/>}/>
                            </Route>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
}

export default App;
