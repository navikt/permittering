import React from 'react';
import { BodyShort, Button, Heading, Ingress, Link } from '@navikt/ds-react';
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
        : (window.location.href = '/permittering/redirect-til-login');
};

const LoggInn = () => {
    return (
        <div className="innloggingsside">
            <LoggInnBanner />
            <div className="innloggingsside__innhold">
                <img src={skjema} className="innloggingsside__circle" alt="" />

                <Heading level="2" size="large" className="innloggingsside__sidetittel">
                    Meld fra til NAV
                </Heading>
                <Ingress className="innloggingsside__ingress">
                    Arbeidsgivers meldeplikt til NAV ved masseoppsigelser, permittering uten lønn og
                    innskrenkning i arbeidstid.
                </Ingress>

                <Button className="innloggingsside__loginKnapp" onClick={redirectTilLogin}>
                    Logg inn
                </Button>

                <div className="innloggingsside__besok-ditt-nav">
                    <BodyShort>
                        Ønsker du å se dine tjenester som privatperson?
                        <div className="logg-inn-lenke">
                            <Link href="https://www.nav.no/person/dittnav/">
                                Logg inn på Ditt NAV
                            </Link>
                        </div>
                    </BodyShort>
                </div>
            </div>
        </div>
    );
};

export default LoggInn;
