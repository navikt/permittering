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
        console.log('lokal logging kallt', document.cookie.includes('localhost-idtoken'));
        if (document.cookie.includes('localhost-idtoken')) {
            setInnlogget(Tilgang.TILGANG);
        } else {
            setInnlogget(Tilgang.IKKE_TILGANG);
        }
    };

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        const getLoginStatus = async () => {
            if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
                const abortController = new AbortController();
                const signal = abortController.signal;
                let innlogget = sjekkInnlogget(signal);
                if (innlogget) {
                    setInnlogget(Tilgang.TILGANG);
                } else {
                    setInnlogget(Tilgang.IKKE_TILGANG);
                }
            } else {
                localLogin();
            }
        };
        getLoginStatus();
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
