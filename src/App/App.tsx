import React from 'react';
import './App.less';
import { basePath } from '../paths.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InputAvPersoner from './Skjema/Side3-personer/InputAvPersoner';
import LoginBoundary from './LoginBoundary';
import HvaSkalDuRapportere from './HvaSkalDuRapportere/HvaSkalDuRapportere';
import { SkjemaProvider } from './SkjemaContext/SkjemaContext';
import Side1 from './Skjema/Side1/Side1';
import Forside from './Forside/Forside';
import Side2 from './Skjema/Side2/Side2';
import Oppsummering from './Skjema/Side4-oppsummering/Oppsummering';
import Kvitteringsside from './Skjema/Kvittering/Kvitteringsside';
import { OrganisasjonsListeProvider } from './OrganisasjonslisteProvider';
import { IntlProvider } from 'react-intl';
import 'moment/locale/nb';
import { FeatureToggleProvider } from './FeatureToggleProvider';

function App() {
    return (
        <IntlProvider locale={'nb'}>
            <div className="app">
                <LoginBoundary>
                    <Router basename={basePath}>
                        <OrganisasjonsListeProvider>
                            <FeatureToggleProvider>
                                <Route exact path="/">
                                    <Forside />
                                </Route>
                                <>
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
                                </>{' '}
                            </FeatureToggleProvider>
                        </OrganisasjonsListeProvider>
                    </Router>
                </LoginBoundary>
            </div>
        </IntlProvider>
    );
}

export default App;
