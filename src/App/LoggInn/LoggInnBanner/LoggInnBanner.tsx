import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import kontor from './kontor.svg';
import './LoggInnBanner.less';

const LoggInnBanner = () => {
    return (
        <div className="logg-inn-banner">
            <div className="logg-inn-banner__container">
                <div className="logg-inn-banner__tittel-og-tekst">
                    <Sidetittel className="logg-inn-banner__tittel">
                        Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i
                        arbeidstid
                    </Sidetittel>
                </div>
                <div className="logg-inn-banner__bilder">
                    <img src={kontor} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LoggInnBanner;
