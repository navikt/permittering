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
import {Oppsummering} from "./Skjema/Oppsummering";

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
                                <Route path="oppsummering/" element={ <Oppsummering skjema={{
                                    id: '123',
                                    opprettetTidspunkt: "22.01.2021",
                                    bedriftNr: "123",
                                    bedriftNavn: "Testbedrift",
                                    type: 'MASSEOPPSIGELSE',
                                    kontaktNavn: "Kontakt Navn",
                                    kontaktTlf: "12345678",
                                    kontaktEpost: "kontakt.navn@testbedrift.no",
                                    varsletAnsattDato: "22.01.2021",
                                    varsletNavDato: "22.01.2021",
                                    startDato: "22.01.2021",
                                    sluttDato: "22.01.2021",
                                    ukjentSluttDato: false,
                                    fritekst: "Fritekst",
                                    personer: [{
                                        fnr: "123",
                                        grad: 2,
                                        selected: false,
                                        kommentar: "Kommentar",
                                    }],
                                    antallBerørt: 123,
                                    sendtInnTidspunkt: "22.01.2021",
                                    avbrutt: false,
                                    årsakskode: "123",
                                    årsakstekst: "Grunnen til masseoppsigelsen er økte utgifter generelt. Ingen god" +
                                        "følelse å la 123 dyktige medarbeidere gå, men ['You´re fired' for _ in range(123)]",
                                    yrkeskategorier: [{
                                        konseptId: 123,
                                        styrk08: "123",
                                        label: "Label",

                                    }]
                                }}/>}/>
                            </Route>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
}

export default App;
