import 'moment/locale/nb';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { brukerLoggetPa } from '../utils/funksjonerForAmplitudeLogging';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import './App.css';
import { OrganisasjonsListeProvider } from './OrganisasjonslisteProvider';
import { SkjemaProvider } from './Skjema/SkjemaContext/SkjemaContext';
import Side0 from './Skjema/Side0 -hvaSkalDuRapportere/HvaSkalDuRapportere';
import Side1 from './Skjema/Side1/Side1';
import Side2 from './Skjema/Side2/Side2';
import Side5 from './Skjema/Side5-yrker/Yrkeskategorier';
import Oppsummering from './Skjema/Side4-oppsummering/Oppsummering';
import Kvitteirng from './Skjema/Kvitteringsside/Kvitteringsside';

function App() {
    useEffect(() => {
        brukerLoggetPa();
    }, []);

    const basePath = '/permittering';

    return (
        <IntlProvider locale={'nb'}>
            <div className="app">
                <LoginBoundary>
                    <Router basename={basePath}>
                        <Route exact path="/">
                            <Forside />
                        </Route>
                        <Route path="/skjema">
                            <OrganisasjonsListeProvider>
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
                                        <Side2 />
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
                                <Route exact path="/skjema/kvitteringsside/:id">
                                    <SkjemaProvider>
                                        <Kvitteirng />
                                    </SkjemaProvider>
                                </Route>
                            </OrganisasjonsListeProvider>
                        </Route>
                    </Router>
                </LoginBoundary>
            </div>
        </IntlProvider>
    );
}

export default App;
