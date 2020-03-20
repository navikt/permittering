import React from 'react';
import ReactDOM from 'react-dom';
import { init as Sentry } from '@sentry/browser';
import 'core-js';
import 'unorm/lib/unorm';
import App from './App/App';

Sentry({
    dsn: 'https://7a256b46169e4a9e9d7de25bbbec86b6@sentry.gc.nav.no/23',
    release: process.env.GIT_COMMIT_HASH || 'unknown',
    environment: window.location.hostname,
});

if (process.env.REACT_APP_MOCK) {
    console.log('==========================================');
    console.log('=============== MED MOCK =================');
    console.log('=== DETTE SKAL DU IKKE SE I PRODUKSJON ===');
    console.log('==========================================');

    require('./mocking/AltinnMock');
}

ReactDOM.render(<App />, document.getElementById('root'));
