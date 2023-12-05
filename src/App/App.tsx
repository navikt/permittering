import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import {OrganisasjonsListeProvider} from './OrganisasjonslisteProvider';
import {PermitteringUtenLønn} from "./Skjema/PermitteringUtenLønn";
import {Kvittering} from "./Skjema/Kvittering";
import {InnskrenkningIArbeidstid} from "./Skjema/InnskrenkningIArbeidstid";
import {Masseoppsigelse} from "./Skjema/Masseoppsigelse";
import {Permitteringsskjema, Årsakskoder} from "../types/Permitteringsskjema";


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
                                <OrganisasjonsListeProvider>
                                    <Outlet/>
                                </OrganisasjonsListeProvider>
                            }
                        >
                            <Route path="/" element={<Forside/>}/>
                            <Route path="/skjema">
                                <Route path="PERMITTERING_UTEN_LØNN" element={<PermitteringUtenLønn/>}/>
                                <Route path="MASSEOPPSIGELSE" element={<Masseoppsigelse/>}/>
                                <Route path="INNSKRENKNING_I_ARBEIDSTID" element={<InnskrenkningIArbeidstid/>}/>
                                <Route path="kvitteringsside/:skjemaId" element={<Kvittering />}/>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
}


const demoSkjema : Permitteringsskjema = {
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
