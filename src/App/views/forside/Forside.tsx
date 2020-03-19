import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import { hentAlle } from '../../../api/skjema-api';
import './Forside.less';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { Feature, FeatureToggleContext } from '../../../FeatureToggleProvider';
import { useHistory } from 'react-router';

const Forside: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const lonnstilskuddToggle = featureToggleContext[Feature.frontenderpaa];
    const history = useHistory();
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[]>([]);

    useEffect(() => {
        hentAlle().then(setSkjemaer);
    }, []);

    return (
        <HvitSideBoks>
            <div className={'forside__topp'}>
                <Systemtittel>Tidligere skjemaer virksomheten har sendt til NAV</Systemtittel>
                {lonnstilskuddToggle && (
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
    );
};
export default Forside;
