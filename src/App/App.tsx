import React, { useState } from "react";
import "./App.less";
import { basePath } from "../paths.json";
import { BrowserRouter as Router, Route } from "react-router-dom";
import InputAvPersoner from "./views/input-av-personer/InputAvPersoner";
import Banner from "./HovedBanner/HovedBanner";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import LoginBoundary from "./LoginBoundary";
import HvaSkalDuRapportere from "./HvaSkalDuRapportere/HvaSkalDuRapportere";
import { SkjemaProvider } from "./SkjemaContext/SkjemaContext";
import Side1 from "./Skjema/Side1/Side1";
import Forside from "./views/forside/Forside";
import Side2 from "./Skjema/Side2";
import Oppsummering from "./Skjema/Oppsummering";

function App() {
  const [organisasjoner, setorganisasjoner] = useState(Array<Organisasjon>());
  return (
    <div className="app">
      <LoginBoundary>
        <Router basename={basePath}>
          <Banner organisasjoner={organisasjoner} />
          <Route exact path="/">
            <Forside setOrganisasjoner={setorganisasjoner} />
          </Route>
          <Route exact path="/skjema/start">
            <SkjemaProvider>
              <HvaSkalDuRapportere />
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/kontaktinformasjon/:id">
            <SkjemaProvider>
              <Side1 />
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/generelle-opplysninger/:id">
            <SkjemaProvider>
              <Side2 />
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/hvem-rammes/:id">
            <SkjemaProvider>
              <InputAvPersoner />
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/oppsummering/:id">
            <SkjemaProvider>
              <Oppsummering />
            </SkjemaProvider>
          </Route>
        </Router>
      </LoginBoundary>
    </div>
  );
}

export default App;
