import React from 'react';
import { Sidetittel, Ingress } from 'nav-frontend-typografi';
import medhjelm from './med-hjelm.svg';
import telefon from './telefon-person.svg';
import kokk from './kokk.png';
import './LoggInnBanner.less';

const LoggInnBanner = () => {
    return (
        <div className="logg-inn-banner">
            <div className="logg-inn-banner__container">
                <div className="logg-inn-banner__tittel-og-tekst">
                    <Sidetittel className="logg-inn-banner__tittel">Permitteringsskjma </Sidetittel>
                    <Ingress className="logg-inn-banner__ingress">Innloggede tjenester for arbeidsgiver </Ingress>
                </div>
                <div className="logg-inn-banner__bilder">
                    <img src={medhjelm} alt="" />
                    <img src={telefon} alt="" />
                    <img src={kokk} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LoggInnBanner;
