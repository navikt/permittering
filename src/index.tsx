import React from 'react';
import ReactDOM from 'react-dom';
import {injectDecoratorClientSide} from '@navikt/nav-dekoratoren-moduler';
import '@navikt/ds-css';
import App from './App/App';
import environment, {gittMiljo} from './utils/environment';
import { initializeFaro } from '@grafana/faro-web-sdk';

initializeFaro({
    url: gittMiljo({
        prod: 'https://telemetry.nav.no/collect',
        dev: 'https://telemetry.ekstern.dev.nav.no/collect',
        other: '/collect',
    }),
    app: {
        name: 'permittering',
        version: environment.GIT_COMMIT,
    },
});

injectDecoratorClientSide({
    env: gittMiljo({
        prod: 'prod',
        other: 'dev',
    }),
    params: {
        context: 'arbeidsgiver',
        language: 'nb',
        redirectToApp: true,
        logoutUrl: gittMiljo({
            prod: 'https://arbeidsgiver.nav.no/permittering/oauth2/logout',
            other: 'https://permitteringsskjema.intern.dev.nav.no/permittering/oauth2/logout',
        }),
    }
}).catch(console.error)

ReactDOM.render(
    gittMiljo({
        prod: <App />,
        other: (
            <React.StrictMode>
                {' '}
                <App />{' '}
            </React.StrictMode>
        ),
    }),
    document.getElementById('root')
);
