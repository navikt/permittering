import React, { useEffect } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import KvitteringIkon from './KvitteringIkon';
import './Kvitteringsside.less';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

const Kvitteringsside = () => {
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    useEffect(() => {
        loggNavarendeSteg('kvittering');
    }, []);

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <VerticalSpacer rem={2} />
            <HvitSideBoks classname="kvitteringside">
                <div className="kvitteringside__ikon">
                    <KvitteringIkon />
                </div>
                <div className="kvitteringside__tekst">
                    <Systemtittel>Skjema er sendt til NAV</Systemtittel>
                    <Normaltekst className="kvitteringside-ingress">
                        Skjemaet er sendt til NAV i kommunen eller fylket virksomheten din tilhører.
                    </Normaltekst>
                </div>
                <Lenkepanel
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/"
                    border
                    tittelProps="normaltekst"
                >
                    Gå til Min side – arbeidsgiver
                </Lenkepanel>
                <Lenkepanel
                    href="https://www.nav.no/no/bedrift/innhold-til-bedrift-forside/nyheter/permitteringer-som-folge-av-koronaviruset"
                    border
                    tittelProps="normaltekst"
                >
                    Informasjon om permitteringer til arbeidsgivere i forbindelse med koronaviruset
                </Lenkepanel>
            </HvitSideBoks>
        </>
    );
};

export default Kvitteringsside;
