import React, { useEffect } from 'react';
import './App.less';
import { basePath } from '../paths.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginBoundary from './LoginBoundary';
import Forside from './Forside/Forside';
import { OrganisasjonsListeProvider } from './OrganisasjonslisteProvider';
import { IntlProvider } from 'react-intl';
import 'moment/locale/nb';
import { FeatureToggleProvider } from './FeatureToggleProvider';
import { brukerLoggetPa } from '../utils/funksjonerForAmplitudeLogging';
import PermitteringRoutes from './Skjema/PermitteringRoutes';
import RefusjonRoutes from './Refusjon/RefusjonRoutes';

function App() {
    useEffect(() => {
        brukerLoggetPa();
    }, []);

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
                                <PermitteringRoutes />
                                <RefusjonRoutes />
                            </FeatureToggleProvider>
                        </OrganisasjonsListeProvider>
                    </Router>
                </LoginBoundary>
            </div>
        </IntlProvider>
    );
}

export default App;
