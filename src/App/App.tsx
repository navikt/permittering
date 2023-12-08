import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {SWRConfig} from 'swr';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import {OrganisasjonsListeProvider} from './OrganisasjonslisteProvider';
import {Kvittering} from "./Skjema/Kvittering";
import {Permitteringsskjema, Årsakskoder} from "../types/Permitteringsskjema";
import {Skjema} from "./Skjema/Skjema";
import {LoggSidevisning} from "../utils/LoggSidevisning";


function App() {
    const basePath = '/permittering';

    return (
        <div className="app">
            <LoginBoundary>
                <SWRConfig
                    value={{
                        revalidateOnFocus: false,
                    }}
                >
                    <BrowserRouter basename={basePath}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <OrganisasjonsListeProvider>
                                        <LoggSidevisning />
                                        <Outlet/>
                                    </OrganisasjonsListeProvider>
                                }
                            >
                                <Route path="/" element={<Forside/>}/>
                                <Route path="/skjema">
                                    <Route path="PERMITTERING_UTEN_LØNN"
                                           element={<Skjema type="PERMITTERING_UTEN_LØNN"/>}/>
                                    <Route path="MASSEOPPSIGELSE"
                                           element={<Skjema type="MASSEOPPSIGELSE"/>}/>
                                    <Route path="INNSKRENKNING_I_ARBEIDSTID"
                                           element={<Skjema type="INNSKRENKNING_I_ARBEIDSTID"/>}/>
                                    <Route path="kvitteringsside/:skjemaId" element={<Kvittering/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SWRConfig>
            </LoginBoundary>
        </div>
    );
}


const demoSkjema: Permitteringsskjema = {
    id: '123',
    bedriftNr: "123",
    bedriftNavn: "Testbedrift",
    type: 'MASSEOPPSIGELSE',
    kontaktNavn: "Kontakt Navn",
    kontaktTlf: "12345678",
    kontaktEpost: "kontakt.navn@testbedrift.no",
    startDato: new Date(),
    sluttDato: new Date(),
    ukjentSluttDato: false,
    fritekst: "Fritekst",
    antallBerørt: 123,
    sendtInnTidspunkt: new Date(),
    årsakskode: 'MANGEL_PÅ_ARBEID',
    årsakstekst: Årsakskoder.MANGEL_PÅ_ARBEID,
    yrkeskategorier: [{
        konseptId: 123,
        styrk08: "123",
        label: "Kokk",
    }, {
        konseptId: 23,
        styrk08: "23",
        label: "Statusminuster",
    }]
}

export default App;
