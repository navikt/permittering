import React from 'react';
import { Route } from 'react-router-dom';
import { RefusjonOrganisasjonsListeProvider } from '../OrganisasjonslisteRefusjonProvider';
import { RefusjonProvider } from './RefusjonContext';
import VelgBedrift from './Steg0-VelgBedrift';
import Generelt from './Steg1-Generelt';
import Arbeidsforhold from './Steg2-Arbeidsforhold';
import Oppsummering from './Steg3-Oppsummering';

const RefusjonRoutes = () => {
    return (
        <>
            <Route path="/refusjon">
                <RefusjonOrganisasjonsListeProvider>
                    <Route exact path="/refusjon/start">
                        <RefusjonProvider>
                            <VelgBedrift />
                        </RefusjonProvider>
                    </Route>
                    <Route exact path="/refusjon/generelt/:id">
                        <RefusjonProvider>
                            <Generelt />
                        </RefusjonProvider>
                    </Route>
                    <Route exact path="/refusjon/arbeidsforhold/:id">
                        <RefusjonProvider>
                            <Arbeidsforhold />
                        </RefusjonProvider>
                    </Route>
                    <Route exact path="/refusjon/oppsummering/:id">
                        <RefusjonProvider>
                            <Oppsummering />
                        </RefusjonProvider>
                    </Route>
                </RefusjonOrganisasjonsListeProvider>
            </Route>
        </>
    );
};

export default RefusjonRoutes;
