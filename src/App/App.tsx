import React, {useEffect, useState} from "react";
import "./App.less";
import {basePath} from "../paths.json";
import {BrowserRouter as Router, Route} from "react-router-dom";
import InputAvPersoner from "./views/input-av-personer/InputAvPersoner"
import Banner from "./HovedBanner/HovedBanner";
import {hentOrganisasjonerFraAltinn} from "../api/AltinnApi";
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";
import LoginBoundary from "./LoginBoundary";
import HvaSkalDuRapportere from "./HvaSkalDuRapportere/HvaSkalDuRapportere";
import Skjema from "./Skjema/Skjema";
import {SkjemaProvider} from "./SkjemaContext/SkjemaContext";

function App() {
  const [organisasjoner, setorganisasjoner] = useState(Array<Organisasjon>());

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    hentOrganisasjonerFraAltinn(signal).then(organisasjonsliste => {
      setorganisasjoner(
        organisasjonsliste.filter(
          organisasjon =>
            organisasjon.OrganizationForm === "BEDR" ||
            organisasjon.Type === "Enterprise"
        )
      );
    });
  }, []);

  console.log(organisasjoner);

  return (
    <div className="app">
      <LoginBoundary>
        <Router basename={basePath}>
          <Banner organisasjoner={organisasjoner} />
          <Route exact path="/">
            <HvaSkalDuRapportere />
          </Route>
          <Route exact path="/permitteringsskjema">
            Permitteringsskjema
          </Route>
          <Route exact path="/input">
            Sett komponent for person-input her
          </Route>
          <Route exact path="/skjema">
            <SkjemaProvider>
              <Skjema/>
            </SkjemaProvider>
          </Route>
          <Route exact path="/steg3">
            <SkjemaProvider>
              <InputAvPersoner/>
            </SkjemaProvider>
          </Route>
          <Route exact path="/steg2">
            <SkjemaProvider>
              <InputAvPersoner/>
            </SkjemaProvider>
          </Route>
        </Router>
      </LoginBoundary>
    </div>
  );
}

export default App;
