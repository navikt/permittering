'use client';

import { Alert } from '@navikt/ds-react';
import React, { ReactNode } from 'react';
import { faro } from '@grafana/faro-web-sdk';
import { SimpleErrorBoundary } from './komponenter/SimpleErrorBoundary';
import { Side } from './Side';
import { FARO_ENABLED } from '../index';

function onError(error: Error) {
    console.error(
        `#FARO: Generisk feil ${error.name}:\nmessage: ${error.message}\nstack: ${error.stack}\n`
    );

    if (FARO_ENABLED) {
        faro.api.pushError(error);
    }
}

export const AppErrorBoundary = ({ children }: { children: ReactNode }) => {
    return (
        <SimpleErrorBoundary
            fallback={
                <Side tittel='Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid'>
                    <Alert className={'app-error-alert'} variant={'error'}>
                        En ukjent feil ble oppdaget. Du kan forsøke å laste inn siden på nytt.{' '}
                        <div>
                            <a href={window.location.href}>Last inn siden på nytt</a>
                        </div>
                        <div>
                            <a href={'/'}>Gå til forsiden</a>
                        </div>
                    </Alert>
                </Side>
            }
            onError={onError}
        >
            {children}
        </SimpleErrorBoundary>
    );
};
