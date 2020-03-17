import React, {useEffect, useState} from "react";
import "./App.less";
import {basePath} from "../paths.json";
import {BrowserRouter as Router, Route} from "react-router-dom";
import InputAvPersoner from "./views/input-av-personer/InputAvPersoner";
import Banner from "./HovedBanner/HovedBanner";
import {hentOrganisasjonerFraAltinn} from "../api/AltinnApi";
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";
import LoginBoundary from "./LoginBoundary";
import HvaSkalDuRapportere from "./HvaSkalDuRapportere/HvaSkalDuRapportere";
import {SkjemaProvider} from "./SkjemaContext/SkjemaContext";
import Side1 from "./Skjema/Side1";
import Forside from "./views/forside/Forside";
import SkjemaRamme from "./komponenter/SkjemaRamme";

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

  return (
    <div className="app">
      <LoginBoundary>
        <Router basename={basePath}>
          <Banner organisasjoner={organisasjoner}/>
          <Route exact path="/forside">
            <Forside/>
          </Route>
          <Route exact path="/">
            <HvaSkalDuRapportere/>
          </Route>
          <Route exact path="/skjema">
            <SkjemaProvider>
              <HvaSkalDuRapportere/>
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/kontaktinformasjon/:id">
            <SkjemaProvider>
              <SkjemaRamme>
                <Side1 nesteSide={"hvem-rammes"}/>
              </SkjemaRamme>
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/hvem-rammes/:id">
            <SkjemaProvider>
              <SkjemaRamme>
                <InputAvPersoner nesteSide={"oppsummering"}/>
              </SkjemaRamme>
            </SkjemaProvider>
          </Route>
        </Router>
      </LoginBoundary>
    </div>
  );
}

export default App;
