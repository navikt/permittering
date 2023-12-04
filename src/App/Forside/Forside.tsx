import React, {FunctionComponent, useEffect, useState} from 'react';
import {VStack} from '@navikt/ds-react';
import {Permitteringsskjema} from '../../types/Permitteringsskjema';
import {hentAlle} from '../../api/permittering-api';
import {loggAntallPaBegynteSkjema, loggNavarendeSteg,} from '../../utils/funksjonerForAmplitudeLogging';
import InfoOmMeldepliktBoks from './InfoOmMeldepliktBoks/InfoOmMeldepliktBoks';
import './Forside.css';
import {InnsendteSkjemaer} from "./MineSkjema/InnsendteSkjemaer";
import {Side} from "../Side";
import {Breadcrumbs} from "../Skjema/Breadcrumbs";

const Forside: FunctionComponent = () => {
    const [skjema, setSkjema] = useState<Permitteringsskjema[] | undefined>(undefined);

    useEffect(() => {
        loggNavarendeSteg('oversikt-tidligere-skjema');
        hentAlle().then(setSkjema);
    }, []);

    useEffect(() => {
        if (skjema && skjema.length > 0) {
            const antallPaBegynte = skjema.filter(({sendtInnTidspunkt: ts}) => ts === null || ts === '').length;
            loggAntallPaBegynteSkjema(antallPaBegynte);
        }
    }, [skjema]);

    return (
        <Side
            tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"
        >
            <Breadcrumbs />
            <VStack gap="4" className="forside-container">
                <InfoOmMeldepliktBoks/>
                <InnsendteSkjemaer skjemaer={skjema}/>
            </VStack>
        </Side>
    );
};

export default Forside;
