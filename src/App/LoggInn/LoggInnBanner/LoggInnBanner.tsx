import React from 'react';
import { Heading } from '@navikt/ds-react';
import kontor from './kontor.svg';
import './LoggInnBanner.css';

const LoggInnBanner = () => {
    return (
        <div className="logg-inn-banner">
            <div className="logg-inn-banner__container">
                <div className="logg-inn-banner__tittel-og-tekst">
                    <Heading size="large" level="1" className="logg-inn-banner__tittel">
                        Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i
                        arbeidstid
                    </Heading>
                </div>
                <div className="logg-inn-banner__bilder">
                    <img src={kontor} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LoggInnBanner;
