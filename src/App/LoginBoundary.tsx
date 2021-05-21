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

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        const abortController = new AbortController();
        sjekkInnlogget(abortController.signal).then(innlogget => {
            if (innlogget) {
                setInnlogget(Tilgang.TILGANG);
            } else {
                setInnlogget(Tilgang.IKKE_TILGANG);
            }
        });
        return () => abortController.abort();
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
