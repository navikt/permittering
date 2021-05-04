import React, { useEffect } from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import './Kvitteringsside.less';
import OppsummeringKvittering from './OppsummeringKvittering';

const Kvitteringsside = () => {
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('kvittering');
    }, []);

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname="kvitteringside">
                <div className="kvitteringside__tekst">
                    <OppsummeringKvittering />
                </div>
                <ul aria-label="Lenker">
                    <li>
                        <Lenkepanel
                            href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/"
                            border
                            tittelProps="normaltekst"
                        >
                            Gå til Min side – arbeidsgiver
                        </Lenkepanel>
                    </li>
                    <li>
                        <Lenkepanel
                            href="https://www.nav.no/no/bedrift/innhold-til-bedrift-forside/nyheter/permitteringer-som-folge-av-koronaviruset"
                            border
                            tittelProps="normaltekst"
                        >
                            Informasjon om permitteringer til arbeidsgivere i forbindelse med
                            koronaviruset
                        </Lenkepanel>
                    </li>
                </ul>
            </HvitSideBoks>
        </>
    );
};

export default Kvitteringsside;
