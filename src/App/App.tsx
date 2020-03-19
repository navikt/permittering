import React from 'react';
import './App.less';
import { basePath } from '../paths.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InputAvPersoner from './views/input-av-personer/InputAvPersoner';
import Banner from './HovedBanner/HovedBanner';
import LoginBoundary from './LoginBoundary';
import HvaSkalDuRapportere from './HvaSkalDuRapportere/HvaSkalDuRapportere';
import { SkjemaProvider } from './SkjemaContext/SkjemaContext';
import Side1 from './Skjema/Side1/Side1';
import Forside from './views/forside/Forside';
import Side2 from './Skjema/Side2';
import Oppsummering from './Skjema/side4-oppsummering/Oppsummering';
import Kvitteringsside from './views/kvittering/Kvitteringsside';
import { OrganisasjonsListeProvider } from './OrganisasjonslisteProvider';

function App() {
    return (
        <div className="app">
            <LoginBoundary>
                <OrganisasjonsListeProvider>
                    <Router basename={basePath}>
                        <Banner />
                        <Route exact path="/">
                            <Forside />
                        </Route>
                        <Route exact path="/skjema/start">
                            <SkjemaProvider>
                                <HvaSkalDuRapportere />
                            </SkjemaProvider>
                        </Route>
                        <Route exact path="/skjema/kontaktinformasjon/:id">
                            <SkjemaProvider>
                                <Side1 />
                            </SkjemaProvider>
                        </Route>
                        <Route exact path="/skjema/generelle-opplysninger/:id">
                            <SkjemaProvider>
                                <Side2 />
                            </SkjemaProvider>
                        </Route>
                        <Route exact path="/skjema/hvem-rammes/:id">
                            <SkjemaProvider>
                                <InputAvPersoner />
                            </SkjemaProvider>
                        </Route>
                        <Route exact path="/skjema/oppsummering/:id">
                            <SkjemaProvider>
                                <Oppsummering />
                            </SkjemaProvider>
                        </Route>
                        <Route exact path="/skjema/kvitteringsside">
                            <Kvitteringsside />
                        </Route>
                    </Router>
                </OrganisasjonsListeProvider>
            </LoginBoundary>
        </div>
    );
}

export default App;
