import React, {FunctionComponent} from 'react';
import {VStack} from '@navikt/ds-react';
import InfoOmMeldepliktBoks from './InfoOmMeldepliktBoks/InfoOmMeldepliktBoks';
import './Forside.css';
import {InnsendteSkjemaer} from "./MineSkjema/InnsendteSkjemaer";
import {Side} from "../Side";
import {Breadcrumbs} from "../Skjema/Breadcrumbs";

const Forside: FunctionComponent = () => {
    return (
        <Side
            tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"
        >
            <Breadcrumbs />
            <VStack gap="4" className="forside-container">
                <InfoOmMeldepliktBoks/>
                <InnsendteSkjemaer />
            </VStack>
        </Side>
    );
};

export default Forside;
