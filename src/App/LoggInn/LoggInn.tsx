import React from 'react';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Button, Link } from '@navikt/ds-react';
import LoggInnBanner from './LoggInnBanner/LoggInnBanner';
import skjema from './skjema.svg';
import './Logginn.css';

const lokalKjoring = () => {
    return window.location.hostname === 'localhost';
};

export const redirectTilLogin = () => {
    lokalKjoring()
        ? (window.location.href =
              'http://localhost:8080/permitteringsskjema-api/auth/mock-token?redirect=http://localhost:3000/permittering')
        : (window.location.href =
              '/permittering/oauth2/login?redirect=/permittering/login-callback');
};

const LoggInn = () => {
    return (
        <div className="innloggingsside">
            <LoggInnBanner />
            <div className="innloggingsside__innhold">
                <img src={skjema} className="innloggingsside__circle" alt="" />

                <Innholdstittel className="innloggingsside__sidetittel" tag="h2">
                    Meld fra til NAV
                </Innholdstittel>
                <Ingress className="innloggingsside__ingress">
                    Arbeidsgivers meldeplikt til NAV ved masseoppsigelser, permittering uten lønn og
                    innskrenkning i arbeidstid.
                </Ingress>

                <Button className="innloggingsside__loginKnapp" onClick={redirectTilLogin}>
                    Logg inn
                </Button>

                <div className="innloggingsside__besok-ditt-nav">
                    <Normaltekst>
                        Ønsker du å se dine tjenester som privatperson?
                        <div className="logg-inn-lenke">
                            <Link href="https://www.nav.no/person/dittnav/">
                                Logg inn på Ditt NAV
                            </Link>
                        </div>
                    </Normaltekst>
                </div>
            </div>
        </div>
    );
};

export default LoggInn;
