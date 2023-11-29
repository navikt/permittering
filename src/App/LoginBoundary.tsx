import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import LoggInn from './LoggInn/LoggInn';
import {sjekkInnlogget} from '../api/permittering-api';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

const LoginBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

    useEffect(() => {
        setInnlogget(Tilgang.LASTER);
        sjekkInnlogget().then((innlogget) => {
            if (innlogget) {
                setInnlogget(Tilgang.TILGANG);
            } else {
                setInnlogget(Tilgang.IKKE_TILGANG);
            }
        });
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
