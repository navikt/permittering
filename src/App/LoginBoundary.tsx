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

    const lokalKjoring = () => {
        return window.location.hostname === 'localhost';
    };

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        if (lokalKjoring()) {
            setInnlogget(Tilgang.TILGANG);
        } else {
            const abortController = new AbortController();
            sjekkInnlogget(abortController.signal).then((innlogget) => {
                if (innlogget) {
                    setInnlogget(Tilgang.TILGANG);
                } else {
                    setInnlogget(Tilgang.IKKE_TILGANG);
                }
            });
            return () => abortController.abort();
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
