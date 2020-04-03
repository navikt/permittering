import { VenstreChevron } from 'nav-frontend-chevron';

import React from 'react';
import Lenke from 'nav-frontend-lenker';
import './BrodsmuleSti.less';

export const BrodsmuleSti = () => {
    return (
        <Lenke
            className={'app__brodsmulesti'}
            href={'https://arbeidsgiver-q.nav.no/min-side-arbeidsgiver/'}
        >
            <VenstreChevron type={'venstre'} /> Tilbake til Min side – arbeidsgiver
        </Lenke>
    );
};
