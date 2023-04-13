import 'react-app-polyfill/ie11';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import 'core-js';
import 'unorm/lib/unorm';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import 'nav-frontend-grid-style/dist/main.css';
import 'nav-frontend-knapper-style/dist/main.css';
import 'nav-frontend-lenkepanel-style/dist/main.css';
import 'nav-frontend-lenker-style/dist/main.css';
import 'nav-frontend-lukknapp-style/dist/main.css';
import 'nav-frontend-modal-style/dist/main.css';
import 'nav-frontend-paneler-style/dist/main.css';
import 'nav-frontend-skjema-style/dist/main.css';
import 'nav-frontend-spinner-style/dist/main.css';
import 'nav-frontend-stegindikator-style/dist/main.css';
import 'nav-frontend-tabell-style/dist/main.css';
import 'nav-frontend-typografi-style/dist/main.css';
import 'nav-frontend-veileder-style/dist/main.css';
import 'nav-frontend-veilederpanel-style/dist/main.css';
import '@navikt/ds-css';
import App from './App/App';
import environment, { gittMiljo } from './utils/environment';
import * as SentryTypes from '@sentry/types';

class SentryDebugTransport implements SentryTypes.Transport {
    close(timeout?: number): PromiseLike<boolean> {
        return Promise.resolve(true);
    }

    sendEvent(event: SentryTypes.Event): PromiseLike<SentryTypes.Response> {
        console.error('would have sent to sentry', event);
        return Promise.resolve({ status: 'success' });
    }
}

Sentry.init({
    dsn: 'https://7a256b46169e4a9e9d7de25bbbec86b6@sentry.gc.nav.no/23',
    release: environment.GIT_COMMIT,
    environment: window.location.hostname,
    autoSessionTracking: false,
    ...gittMiljo<SentryTypes.Options>({
        prod: {},
        other: {
            transport: SentryDebugTransport,
        },
    }),
    ignoreErrors: [
        'Error: Failed to fetch',
        'TypeError: Failed to fetch',
        'Error: NetworkError when attempting to fetch resource.',
        'TypeError: NetworkError when attempting to fetch resource.',
        'Error: Load failed',
        'TypeError: Load failed',
        'Error: cancelled',
        'TypeError: cancelled',
        'Error: avbrutt',
        'TypeError: avbrutt',
        'Error: cancelado',
        'TypeError: cancelado',
        'Error: anulowane',
        'TypeError: anulowane',
        'Error: avbruten',
        'TypeError: avbruten',
        'Error: anulat',
        'TypeError: anulat',
        'Error: The operation was aborted.',
        'AbortError: The operation was aborted.',
    ],
});

injectDecoratorClientSide({
    env: gittMiljo({
        prod: 'prod',
        other: 'dev',
    }),
    urlLookupTable: false,
    context: 'arbeidsgiver',
    language: 'nb',
    redirectToApp: true,
    logoutUrl: gittMiljo({
        prod: 'https://arbeidsgiver.nav.no/permittering/oauth2/logout',
        other: 'https://permitteringsskjema.dev.nav.no/permittering/oauth2/logout',
    }),
}).catch(Sentry.captureException);

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
