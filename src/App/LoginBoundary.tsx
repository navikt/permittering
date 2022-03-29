import React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import LoggInn from './LoggInn/LoggInn';
import { sjekkInnlogget } from '../api/permittering-api';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

const LoginBoundary: FunctionComponent = (props) => {
    const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        const abortController = new AbortController();
        sjekkInnlogget(abortController.signal).then((innlogget) => {
            if (innlogget) {
                setInnlogget(Tilgang.TILGANG);
            } else {
                setInnlogget(Tilgang.IKKE_TILGANG);
            }
        });
        return () => abortController.abort();
    }, []);

    let redirectPath = null;
    if (window.location.pathname && window.location.pathname.includes('kvitteringsside')) {
        redirectPath = window.location.pathname;
    }

    if (innlogget === Tilgang.LASTER) {
        return <div>Sjekker tilgang...</div>;
    }

    if (innlogget === Tilgang.TILGANG) {
        if (redirectPath) {
            window.location.href = `${redirectPath}`;
            return null;
        } else {
            return <> {props.children} </>;
        }
    }
    if (innlogget === Tilgang.IKKE_TILGANG) {
        if (redirectPath) {
            window.location.href = `/permittering/oauth2/login?redirect=${redirectPath}`;
            return null;
        } else if (window.location.href) {
            return <LoggInn />;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default LoginBoundary;
