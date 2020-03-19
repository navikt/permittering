import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import { hentAlle } from '../../../api/skjema-api';
import './Forside.less';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { useHistory } from 'react-router';
import { Feature, FeatureToggleContext } from '../../../FeatureToggleProvider';

const Forside: FunctionComponent = () => {
    const history = useHistory();
    const featureToggleContext = useContext(FeatureToggleContext);
    const lonnstilskuddToggle = featureToggleContext[Feature.frontenderpaa];
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[]>([]);

    useEffect(() => {
        hentAlle().then(setSkjemaer);
    }, []);

    return (
        <HvitSideBoks>
            <div className={'forside__topp'}>
                <Systemtittel>Tidligere skjemaer du har opprettet</Systemtittel>
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
