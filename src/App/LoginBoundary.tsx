import React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import LoggInn from './LoggInn/LoggInn';
import environment from '../utils/environment';
import { sjekkInnlogget } from '../api/AltinnApi';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

const LoginBoundary: FunctionComponent = props => {
    const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

    const localLogin = () => {
        console.log('sjekker lokal login', document.cookie.includes('localhost-idtoken'));
        if (document.cookie.includes('localhost-idtoken')) {
            setInnlogget(Tilgang.TILGANG);
        } else {
            setInnlogget(Tilgang.IKKE_TILGANG);
        }
    };

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        if (
            environment.MILJO === 'prod-sbs' ||
            environment.MILJO === 'dev-sbs' ||
            environment.MILJO === 'dev-gcp'
        ) {
            const abortController = new AbortController();
            sjekkInnlogget(abortController.signal).then(innlogget => {
                if (innlogget) {
                    setInnlogget(Tilgang.TILGANG);
                } else {
                    setInnlogget(Tilgang.IKKE_TILGANG);
                }
            });
            return () => abortController.abort();
        } else {
            localLogin();
        }
    }, []);

    if (innlogget === Tilgang.TILGANG) {
        return <> {props.children} </>;
    }
    if (innlogget === Tilgang.IKKE_TILGANG) {
        if (window.location.href) {
            return <LoggInn />;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default LoginBoundary;
