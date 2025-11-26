'use client';

import { Alert } from '@navikt/ds-react';
import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Side } from './Side';

export const AppErrorBoundary = ({ children }: { children: ReactNode }) => {
    function onError(error: Error, info: React.ErrorInfo) {
        console.error(
            `#PERMITTERING: Generisk feil ${error.name}:\nmessage: ${error.message}\ncomponentStack: ${info.componentStack}\n`,
        );
    }

    return (
        <ErrorBoundary
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
        </ErrorBoundary>
    );
};
