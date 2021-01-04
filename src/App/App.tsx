import 'moment/locale/nb';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { basePath } from '../paths.json';
import { brukerLoggetPa } from '../utils/funksjonerForAmplitudeLogging';
import { FeatureToggleProvider } from './FeatureToggleProvider';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import RefusjonRoutes from './Refusjon/RefusjonRoutes';
import PermitteringRoutes from './Skjema/PermitteringRoutes';
import './App.less';

function App() {
    useEffect(() => {
        brukerLoggetPa();
    }, []);

    return (
        <IntlProvider locale={'nb'}>
            <div className="app">
                <LoginBoundary>
                    <Router basename={basePath}>
                        <FeatureToggleProvider>
                            <Route exact path="/">
                                <Forside />
                            </Route>
                            <PermitteringRoutes />
                            <RefusjonRoutes />
                        </FeatureToggleProvider>
                    </Router>
                </LoginBoundary>
            </div>
        </IntlProvider>
    );
}

export default App;
