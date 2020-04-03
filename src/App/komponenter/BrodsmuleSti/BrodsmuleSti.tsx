import { VenstreChevron } from 'nav-frontend-chevron';

import React, { useContext, useEffect, useState } from 'react';
import Lenke from 'nav-frontend-lenker';
import './BrodsmuleSti.less';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import environment from '../../../utils/environment';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';

export const BrodsmuleSti = () => {
    const context = useContext(SkjemaContext);
    const [link, setlink] = useState('');

    useEffect(() => {
        setlink(lagLink(context.skjema));
    }, [context.skjema]);

    const lagLink = (skjema: Permitteringsskjema) => {
        const bedriftsnummer = skjema ? skjema.bedriftNr : '';
        if (environment.MILJO === 'prod-sbs') {
            return 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/' + bedriftsnummer;
        }
        return 'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/' + bedriftsnummer;
    };

    return (
        <Lenke className={'app__brodsmulesti'} href={link}>
            <VenstreChevron type={'venstre'} /> Tilbake til Min side – arbeidsgiver
        </Lenke>
    );
};
