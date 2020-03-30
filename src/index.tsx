import 'react-app-polyfill/ie11';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import 'core-js';
import 'unorm/lib/unorm';
import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { init as Sentry } from '@sentry/browser';
import App from './App/App';

const tagManagerArgs = {
    gtmId: 'GTM-PM9RP3',
};

TagManager.initialize(tagManagerArgs);

Sentry({
    dsn: 'https://7a256b46169e4a9e9d7de25bbbec86b6@sentry.gc.nav.no/23',
    release: process.env.GIT_COMMIT_HASH || 'unknown',
    environment: window.location.hostname,
});

ReactDOM.render(<App />, document.getElementById('root'));
