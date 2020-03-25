import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';
import { Permitteringsskjema } from '../../types/permitteringsskjema';
import { hentAlle } from '../../api/skjema-api';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import './Forside.less';
import Dekorator from '../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../utils/funksjonerForAmplitudeLogging';

const Forside: FunctionComponent = () => {
    const history = useHistory();
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
            <HvitSideBoks>
                <div className="forside__topp">
                    <Systemtittel>Dine skjema</Systemtittel>
                    {visskjema && (
                        <Hovedknapp onClick={() => history.push('skjema/start')}>
                            Nytt skjema
                        </Hovedknapp>
                    )}
                </div>
                {skjemaer.length ? (
                    <SkjemaTabell skjemaer={skjemaer} />
                ) : (
                    <p>
                        <i>Ingen skjemaer</i>
                    </p>
                )}
            </HvitSideBoks>
        </>
    );
};

export default Forside;
