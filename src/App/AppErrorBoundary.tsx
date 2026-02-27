'use client';

import { Alert } from '@navikt/ds-react';
import React, { ReactNode } from 'react';
import { FaroErrorBoundary } from "@grafana/faro-react";
import { SimpleErrorBoundary } from "./komponenter/SimpleErrorBoundary";
import { Side } from './Side';
import { TELEMETRY_COLLECTOR_URL } from '../index';

function onError(error: Error) {
    console.error(
        `#FARO: Generisk feil ${error.name}:\nmessage: ${error.message}\nstack: ${error.stack}\n`
    );
}

export const AppErrorBoundary = ({ children }: { children: ReactNode }) => {
    const ErrorBoundaryComponent = TELEMETRY_COLLECTOR_URL ? FaroErrorBoundary : SimpleErrorBoundary;

    return (
        <ErrorBoundaryComponent
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
        </ErrorBoundaryComponent>
    );
};
