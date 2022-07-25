import 'moment/locale/nb';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { brukerLoggetPa } from '../utils/funksjonerForAmplitudeLogging';
import { FeatureToggleProvider } from './FeatureToggleProvider';
import Forside from './Forside/Forside';
import LoginBoundary from './LoginBoundary';
import PermitteringRoutes from './Skjema/PermitteringRoutes';
import './App.less';

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
                        <FeatureToggleProvider>
                            <Route exact path="/">
                                <Forside />
                            </Route>
                            <PermitteringRoutes />
                        </FeatureToggleProvider>
                    </Router>
                </LoginBoundary>
            </div>
        </IntlProvider>
    );
}

export default App;
