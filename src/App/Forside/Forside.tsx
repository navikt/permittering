import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';
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
import './Forside.less';

const Forside: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visskjema = featureToggleContext[Feature.visskjema];
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
            <InfoOmMeldepliktBoks visskjema={visskjema} />
            {skjemaer && (
                <>
                    <HvitSideBoks classname="forside__tabell-container">
                        <Systemtittel className="forside__topp">Dine skjema</Systemtittel>
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
