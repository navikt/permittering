import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import LoggInn from './LoggInn/LoggInn';
import {sjekkInnlogget} from '../api/permittering-api';

enum Innlogget {
    LASTER,
    IKKE_INNLOGGET,
    INNLOGGET,
}

const LoginBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    const [innlogget, setInnlogget] = useState(Innlogget.LASTER);

    useEffect(() => {
        setInnlogget(Innlogget.LASTER);
        sjekkInnlogget().then((innlogget) => {
            if (innlogget) {
                setInnlogget(Innlogget.INNLOGGET);
            } else {
                setInnlogget(Innlogget.IKKE_INNLOGGET);
            }
        });
    }, []);

    if (innlogget === Innlogget.INNLOGGET) {
        return <> {props.children} </>;
    }
    if (innlogget === Innlogget.IKKE_INNLOGGET) {
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
