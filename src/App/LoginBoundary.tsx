import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import LoggInn from './LoggInn/LoggInn';
import {sjekkInnlogget} from '../api/permittering-api';
import { Alert, Box, Button } from '@navikt/ds-react';
import { Side } from './Side';
import { Breadcrumbs } from './Skjema/Breadcrumbs';

enum Innlogget {
    LASTER,
    IKKE_INNLOGGET,
    INNLOGGET,
    FEIL,
}

const LoginBoundary: FunctionComponent<PropsWithChildren> = (props) => {
    const [innlogget, setInnlogget] = useState(Innlogget.LASTER);

    useEffect(() => {
        setInnlogget(Innlogget.LASTER);
        sjekkInnlogget()
            .then((innlogget) => {
                if (innlogget) {
                    setInnlogget(Innlogget.INNLOGGET);
                } else {
                    setInnlogget(Innlogget.IKKE_INNLOGGET);
                }
            })
            .catch(() => {
                setInnlogget(Innlogget.FEIL);
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
        if (innlogget === Innlogget.FEIL) {
            return (
                <Side tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid">
                    <Breadcrumbs />
                    <Box background="bg-default" borderRadius="small" padding={{ xs: '4', sm: '4', md: '4', lg: '8' }}>
                        <Alert variant="error">
                            Klarte ikke kontakte baksystemene akkurat nå. Prøv å laste siden på nytt om litt.
                            <div>
                                <Button variant="secondary" type="button" onClick={() => window.location.reload()}>
                                    Last inn siden på nytt
                                </Button>
                            </div>
                        </Alert>
                    </Box>
                </Side>
            );
        }
        return null;
    }
};

export default LoginBoundary;
