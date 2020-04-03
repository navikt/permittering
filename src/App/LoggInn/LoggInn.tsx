import React from 'react';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import LoggInnBanner from './LoggInnBanner/LoggInnBanner';
import { redirectTilLoginPath } from '../../paths.json';
import skjema from './skjema.svg';
import './Logginn.less';

export const redirectTilLogin = () => {
    window.location.href = redirectTilLoginPath;
};

const LoggInn = () => {
    return (
        <div className="innloggingsside">
            <LoggInnBanner />
            <div className="innloggingsside__innhold">
                <img src={skjema} className="innloggingsside__circle" alt="bilde av håndtrykk" />

                <Sidetittel className="innloggingsside__sidetittel">Meld fra til NAV</Sidetittel>
                <Ingress className="innloggingsside__ingress">
                    Arbeidsgivers meldeplikt til NAV ved masseoppsigelser, permittering uten lønn og
                    innskrenkning i arbeidstid.
                </Ingress>

                <Hovedknapp className="innloggingsside__loginKnapp" onClick={redirectTilLogin}>
                    Logg inn
                </Hovedknapp>

                <div className="innloggingsside__besok-ditt-nav">
                    <Normaltekst>
                        Ønsker du å se dine tjenester som privatperson?
                        <div className="logg-inn-lenke">
                            <Lenke href="https://www.nav.no/person/dittnav/">
                                Logg inn på Ditt NAV
                            </Lenke>
                        </div>
                    </Normaltekst>
                </div>
            </div>
        </div>
    );
};

export default LoggInn;
