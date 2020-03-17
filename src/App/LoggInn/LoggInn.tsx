import React from "react";
import { Ingress, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import handshake from "./handshake.svg";
import "./Logginn.less";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Lenke from "nav-frontend-lenker";
import LoggInnBanner from "./LoggInnBanner/LoggInnBanner";
import environment from "../../utils/environment";

const LoggInn = () => {
  const redirectTilLogin = () => {
    if (environment.MILJO === "prod-sbs" || environment.MILJO === "dev-sbs") {
      window.location.href = "/permittering/redirect-til-login";
    } else {
      document.cookie = "selvbetjening-idtoken =0123456789..*; path=/;";
      window.location.href = "/permittering/";
    }
  };

  return (
    <div className="innloggingsside">
      <LoggInnBanner />
      <div className="innloggingsside__innhold">
        <div className="innloggingsside__circle">
          <img
            src={handshake}
            className="handtrykkbilde"
            alt="bilde av håndtrykk"
          />
        </div>
        <Sidetittel className="innloggingsside__sidetittel">
          Send inn permitteringsskjema
        </Sidetittel>

        <Ingress className="innloggingsside__ingress">
          Logg inn for å sende inn skjema
        </Ingress>

        <Hovedknapp
          className="innloggingsside__loginKnapp"
          onClick={redirectTilLogin}
        >
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
