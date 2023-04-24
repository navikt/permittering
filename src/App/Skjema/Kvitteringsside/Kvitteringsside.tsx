import React, { useEffect } from 'react';
import { LinkPanel } from '@navikt/ds-react';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import './Kvitteringsside.css';
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
                        <LinkPanel href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/">
                            Gå til Min side – arbeidsgiver
                        </LinkPanel>
                    </li>
                    <li>
                        <LinkPanel href="https://www.nav.no/no/bedrift/innhold-til-bedrift-forside/nyheter/permitteringer-som-folge-av-koronaviruset">
                            Informasjon om permitteringer til arbeidsgivere i forbindelse med
                            koronaviruset
                        </LinkPanel>
                    </li>
                </ul>
            </HvitSideBoks>
        </>
    );
};

export default Kvitteringsside;
