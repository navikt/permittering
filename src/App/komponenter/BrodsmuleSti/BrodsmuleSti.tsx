import { VenstreChevron } from 'nav-frontend-chevron';
import React, { useContext, useEffect, useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import SkjemaContext from '../../Skjema/SkjemaContext/SkjemaContext';
import environment from '../../../utils/environment';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import './BrodsmuleSti.less';

export const lagLinkTilMinSide = (skjema: Permitteringsskjema) => {
    const bedriftsnummer = skjema && skjema.bedriftNr ? skjema.bedriftNr : '';
    if (environment.MILJO === 'dev-sbs') {
        return 'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/' + bedriftsnummer;
    }
    return 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/' + bedriftsnummer;
};

export const BrodsmuleSti = () => {
    const context = useContext(SkjemaContext);
    const [link, setlink] = useState('');

    useEffect(() => {
        setlink(lagLinkTilMinSide(context.skjema));
    }, [context.skjema]);

    return (
        <div className="app__brodsmulesti">
            <Lenke href={link}>
                <VenstreChevron type={'venstre'} /> Tilbake til Min side – arbeidsgiver
            </Lenke>
        </div>
    );
};
