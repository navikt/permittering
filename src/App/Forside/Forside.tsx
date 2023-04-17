import React, { FunctionComponent, useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Permitteringsskjema } from '../../types/permitteringsskjema';
import { hentAlle } from '../../api/permittering-api';
import SkjemaTabell from './SkjemaTabell/SkjemaTabell';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import Dekorator from '../komponenter/Dekorator/Dekorator';
import {
    loggAntallPaBegynteSkjema,
    loggNavarendeSteg,
} from '../../utils/funksjonerForAmplitudeLogging';
import OversiktForMobil from './oversiktForMobil/oversiktForMobil';
import InfoOmMeldepliktBoks from './InfoOmMeldepliktBoks/InfoOmMeldepliktBoks';
import './Forside.css';

const Forside: FunctionComponent = () => {
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[] | undefined>(undefined);
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    useEffect(() => {
        loggNavarendeSteg('oversikt-tidligere-skjema');
        hentAlle().then(setSkjemaer);
    }, []);

    useEffect(() => {
        if (skjemaer && skjemaer.length > 0) {
            const antallPaBegynte = skjemaer.filter(
                (skjema) => skjema.sendtInnTidspunkt == null || skjema.sendtInnTidspunkt === ''
            ).length;
            antallPaBegynte && loggAntallPaBegynteSkjema(antallPaBegynte);
        }
    }, [skjemaer]);

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <InfoOmMeldepliktBoks />
            {skjemaer && (
                <>
                    <HvitSideBoks classname="forside__tabell-container">
                        <Heading level="3" size="medium" className="forside__topp">
                            Dine skjema
                        </Heading>
                        {skjemaer.length > 0 ? (
                            <SkjemaTabell skjemaer={skjemaer} />
                        ) : (
                            <p>
                                <i>Ingen skjemaer</i>
                            </p>
                        )}
                    </HvitSideBoks>
                    <OversiktForMobil listeMedSkjema={skjemaer} />
                </>
            )}
        </>
    );
};

export default Forside;
