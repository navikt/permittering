import React from 'react';
import { Heading } from '@navikt/ds-react';
import './Dekorator.css';

const lagBannerTittel = (type: string): string => {
    if (type === 'MASSEOPPSIGELSE') {
        return 'Si opp ansatte';
    } else if (type === 'PERMITTERING_UTEN_LØNN') {
        return 'Permittere ansatte';
    } else if (type === 'INNSKRENKNING_I_ARBEIDSTID') {
        return 'Innskrenke arbeidstiden til ansatte';
    }
    return 'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';
};
const Dekorator: React.FunctionComponent<any> = (props) => (
    <div className="banner">
        <div className="banner__inner">
            <Heading level="2" size="large" className="banner__tittel">
                {props.sidetittel ? lagBannerTittel(props.sidetittel) : '\u00a0'}
            </Heading>
            {props.children}
        </div>
    </div>
);

export default Dekorator;
