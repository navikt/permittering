import React, { FunctionComponent, useEffect, useState } from 'react';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import { hentAlle } from '../../../api/skjema-api';
import './Forside.less';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';

const Forside: FunctionComponent = () => {
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[]>([]);
    useEffect(() => {
        hentAlle().then(setSkjemaer);
    }, []);

    return (
        <HvitSideBoks>
            <div className={'forside__topp'}>
                <Systemtittel>Tidligere skjemaer virksomheten har sendt til NAV</Systemtittel>
                <Hovedknapp onClick={() => (window.location.href = '/skjema/start')}>
                    Nytt skjema
                </Hovedknapp>
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
