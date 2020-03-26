import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';
import { Permitteringsskjema } from '../../types/permitteringsskjema';
import { hentAlle } from '../../api/skjema-api';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import './Forside.less';
import Dekorator from '../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../utils/funksjonerForAmplitudeLogging';
import OversiktForMobil from './oversiktForMobil/oversiktForMobil';
import { hardkodedeSkjema } from '../../hardkodetListeMedSkjema';
import InfoOmMeldepliktBoks from './InfoOmMeldepliktBoks/InfoOmMeldepliktBoks';

const Forside: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visskjema = featureToggleContext[Feature.visskjema];
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[]>([]);
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    useEffect(() => {
        hentAlle().then(setSkjemaer);
    }, []);

    loggNavarendeSteg('oversikt-tidligere-skjema');

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <InfoOmMeldepliktBoks visskjema={visskjema} />
            <HvitSideBoks classname={'forside__tabell-container'}>
                <div className="forside__topp">
                    <Systemtittel>Dine skjema</Systemtittel>
                </div>
                {skjemaer.length === 0 ? (
                    <SkjemaTabell skjemaer={hardkodedeSkjema} />
                ) : (
                    <p>
                        <i>Ingen skjemaer</i>
                    </p>
                )}
            </HvitSideBoks>
            <OversiktForMobil listeMedSkjema={hardkodedeSkjema} />
        </>
    );
};

export default Forside;
