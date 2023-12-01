import React, {useEffect} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {brukerLoggetPa} from '../utils/funksjonerForAmplitudeLogging';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import {OrganisasjonsListeProvider, OrganisasjonsListeProviderV2} from './OrganisasjonslisteProvider';
import {SkjemaProvider} from './Skjema/SkjemaContext/SkjemaContext';
import Side0 from './Skjema/Side0 -hvaSkalDuRapportere/HvaSkalDuRapportere';
import Side1 from './Skjema/Side1/Side1';
import Side2 from './Skjema/Side2/Side2';
import Oppsummering from './Skjema/Side4-oppsummering/Oppsummering';
import Kvittering from './Skjema/Kvitteringsside/Kvitteringsside';
import {gittMiljo} from "../utils/environment";
import {setBreadcrumbs} from "@navikt/nav-dekoratoren-moduler";
import {
    InnskrenkningIArbeidstid,
    KvitteringV2,
    Masseoppsigelse,
    PermitteringUtenLønn
} from "./Skjema/Skjemaer";
import {Breadcrumbs} from "./Skjema/Breadcrumbs";

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
                                <OrganisasjonsListeProviderV2>
                                    <Outlet/>
                                </OrganisasjonsListeProviderV2>
                            }
                        >
                            <Route path="/" element={<Forside/>}/>
                            <Route path="/skjema">
                                <Route path="MASSEOPPSIGELSE" element={<Masseoppsigelse />} />
                                <Route path="PERMITTERING_UTEN_LØNN" element={<PermitteringUtenLønn />} />
                                <Route path="INNSKRENKNING_I_ARBEIDSTID" element={<InnskrenkningIArbeidstid />} />
                                <Route path="kvitteringsside/:skjemaId" element={<KvitteringV2 />} />
                            </Route>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </LoginBoundary>
        </div>
    );
}

export default App;
