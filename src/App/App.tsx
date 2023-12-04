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
import {Oppsummering} from "./Skjema/Oppsummering";
import {Permitteringsskjema, Årsakskoder} from "../types/Permitteringsskjema";
import {Side} from "./Side";
import {Box} from "@navikt/ds-react";


function App() {
    const basePath = '/permittering';
    const demoSkjema: Permitteringsskjema = {
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
            startDato: new Date(),
            sluttDato: new Date(),
            ukjentSluttDato: false,
            fritekst: "Fritekst",
            antallBerørt: 123,
            sendtInnTidspunkt: "22.01.2021",
            årsakskode: 'MANGEL_PÅ_ARBEID',
            årsakstekst: Årsakskoder.MANGEL_PÅ_ARBEID,
            yrkeskategorier: [{
            konseptId: 123,
            styrk08: "123",
            label: "Label",

        }]
    }
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
                                <Route path="kvitteringsside/:skjemaId" element={<Kvittering skjema={demoSkjema}/>}/>
                                <Route path="oppsummering/" element={<Side tittel="Permittering uten lønn">
                                    <Box
                                        background="bg-default"
                                        borderRadius="small"
                                        padding={{xs: '2', md: '4', lg: '8'}}
                                    >
                                        <Oppsummering skjema={demoSkjema}/>
                                    </Box>
                                </Side>}/>
                            </Route>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
}

export default App;
