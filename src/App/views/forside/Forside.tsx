import React, { FunctionComponent, useEffect, useState } from 'react';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Knapp } from 'nav-frontend-knapper';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import { hentAlle } from '../../../api/skjema-api';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

const Forside: FunctionComponent = () => {
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[]>([]);
    useEffect(() => {
        hentAlle().then(setSkjemaer);
    }, []);

    return (
        <HvitSideBoks>
            <Knapp>
                <Lenke href={'/permittering/skjema/start'}>Nytt skjema</Lenke>
            </Knapp>
            <VerticalSpacer rem={2} />
            <Undertittel>Tidligere varsler virksomheten har sendt til NAV</Undertittel>
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
