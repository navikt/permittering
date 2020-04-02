import React, { useContext, useEffect } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import KvitteringIkon from './KvitteringIkon';
import './Kvitteringsside.less';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import {
    loggAntallBerorte,
    loggBedriftsInfo,
    loggNavarendeSteg,
    loggProsentAndelPermittert,
} from '../../../utils/funksjonerForAmplitudeLogging';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import environment from '../../../utils/environment';

const Kvitteringsside = () => {
    const context = useContext(SkjemaContext);
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    useEffect(() => {
        if (environment.MILJO === 'prod-sbs') {
            const fullBedrift = organisasjoner.filter(
                org => org.OrganizationNumber === context.skjema.bedriftNr
            )[0];
            fullBedrift &&
                loggBedriftsInfo(fullBedrift).then(antallAnsatte => {
                    const antallBerorte = context.skjema.antallBerørt
                        ? context.skjema.antallBerørt
                        : 0;
                    const antallIBedriftInt = parseInt(antallAnsatte);
                    if (antallBerorte > 0 && context.skjema.type && antallIBedriftInt > 0) {
                        loggAntallBerorte(antallBerorte, context.skjema.type);
                        loggProsentAndelPermittert(
                            context.skjema.type,
                            antallIBedriftInt,
                            antallBerorte
                        );
                    }
                });
        }
    }, [
        organisasjoner,
        context.skjema.bedriftNr,
        context.skjema.antallBerørt,
        context.skjema.type,
    ]);

    useEffect(() => {
        window.scrollTo(0, 0);
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
