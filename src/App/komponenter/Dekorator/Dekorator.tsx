import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import './Dekorator.less';

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
const Dekorator: React.FunctionComponent<any> = props => (
    <div className="banner">
        <div className="banner__inner">
            <Innholdstittel className="dekorator__tittel">
                {props.sidetittel ? lagBannerTittel(props.sidetittel) : '\u00a0'}
            </Innholdstittel>
            {props.children}
        </div>
    </div>
);

export default Dekorator;
