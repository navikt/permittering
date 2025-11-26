import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import { OrganisasjonsListeProvider } from './OrganisasjonslisteProvider';
import { Kvittering } from './Skjema/Kvittering';
import { Skjema } from './Skjema/Skjema';
import { LoggSidevisning } from '../utils/LoggSidevisning';
import { AppErrorBoundary } from './AppErrorBoundary';


function App() {
    const basePath = '/permittering';

    return (
        <div className="app">
            <AppErrorBoundary>
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
                                            <Outlet />
                                        </OrganisasjonsListeProvider>
                                    }
                                >
                                    <Route path="/" element={<Forside />} />
                                    <Route path="/skjema">
                                        <Route path="PERMITTERING_UTEN_LØNN"
                                               element={<Skjema type="PERMITTERING_UTEN_LØNN" />} />
                                        <Route path="MASSEOPPSIGELSE"
                                               element={<Skjema type="MASSEOPPSIGELSE" />} />
                                        <Route path="INNSKRENKNING_I_ARBEIDSTID"
                                               element={<Skjema type="INNSKRENKNING_I_ARBEIDSTID" />} />
                                        <Route path="kvitteringsside/:skjemaId" element={<Kvittering />} />
                                    </Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </SWRConfig>
                </LoginBoundary>
            </AppErrorBoundary>
        </div>
    );
}

export default App;
