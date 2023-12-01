import React, {PropsWithChildren} from 'react';
import {Heading} from '@navikt/ds-react';
import './Banner.css';
import {BannerPictogram} from "./BannerPictogram";

const skjemaTypeTekst = {
    MASSEOPPSIGELSE: 'Si opp ansatte',
    PERMITTERING_UTEN_LØNN: 'Permittere ansatte',
    INNSKRENKNING_I_ARBEIDSTID: 'Innskrenke arbeidstiden til ansatte'
}
const defaultHeading = 'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

type Props = {
    skjematype?: 'MASSEOPPSIGELSE' | 'PERMITTERING_UTEN_LØNN' | 'INNSKRENKNING_I_ARBEIDSTID'
};

const Banner: React.FunctionComponent<PropsWithChildren<Props>> = ({skjematype, children}) => {
    const heading = skjematype !== undefined ? skjemaTypeTekst[skjematype] : defaultHeading
    return (
        <div className="banner">
            <div className="banner__inner">
                <BannerPictogram/>
                <Heading level="2" size="large" className="banner__tittel">
                    {heading}
                </Heading>
                {children}
            </div>
        </div>
    );
};

export default Banner;
