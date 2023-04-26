import React, { useContext, useEffect } from 'react';
import { LinkPanel } from '@navikt/ds-react';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import './Kvitteringsside.css';
import OppsummeringKvittering from './OppsummeringKvittering';
import SkjemaContext from '../SkjemaContext/SkjemaContext';

const Kvitteringsside = () => {
    const context = useContext(SkjemaContext);
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

                    {context.skjema.type === 'MASSEOPPSIGELSE' ? (
                        <li>
                            <LinkPanel href="https://www.nav.no/arbeidsgiver/nedbemanne">
                                Informasjon om nedbemanning til arbeidsgiver
                            </LinkPanel>
                        </li>
                    ) : (
                        <li>
                            <LinkPanel href="https://www.nav.no/arbeidsgiver/permittere">
                                Informasjon om permittering til arbeidsgiver
                            </LinkPanel>
                        </li>
                    )}
                </ul>
            </HvitSideBoks>
        </>
    );
};

export default Kvitteringsside;
