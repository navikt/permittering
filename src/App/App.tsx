import React, { useState } from "react";
import "./App.less";
import { basePath } from "../paths.json";
import { BrowserRouter as Router, Route } from "react-router-dom";
import InputAvPersoner from "./views/input-av-personer/InputAvPersoner";
import Banner from "./HovedBanner/HovedBanner";
import LoginBoundary from "./LoginBoundary";
import HvaSkalDuRapportere from "./HvaSkalDuRapportere/HvaSkalDuRapportere";
import { SkjemaProvider } from "./SkjemaContext/SkjemaContext";
import Side1 from "./Skjema/Side1/Side1";
import Forside from "./views/forside/Forside";
import SkjemaRamme from "./komponenter/SkjemaRamme";
import Side2 from "./Skjema/Side2";
import Oppsummering from "./Skjema/Oppsummering";

import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import { OrganisasjonsListeProvider } from "./OrganisasjonslisteProvider";

function App() {
  return (
    <div className="app">
      <LoginBoundary>
        <OrganisasjonsListeProvider>
          <Router basename={basePath}>
            <Banner />
            <Route exact path="/">
              <Forside />
            </Route>
            <Route exact path="/skjema/start">
              <SkjemaProvider>
                <HvaSkalDuRapportere />
              </SkjemaProvider>
            </Route>
            <Route exact path="/skjema/kontaktinformasjon/:id">
              <SkjemaProvider>
                <SkjemaRamme>
                  <Side1 nesteSide={"generelle-opplysninger"} />
                </SkjemaRamme>
              </SkjemaProvider>
            </Route>
            <Route exact path="/skjema/generelle-opplysninger/:id">
              <SkjemaProvider>
                <SkjemaRamme>
                  <Side2 nesteSide={"hvem-rammes"} />
                </SkjemaRamme>
              </SkjemaProvider>
            </Route>
            <Route exact path="/skjema/hvem-rammes/:id">
              <SkjemaProvider>
                <SkjemaRamme>
                  <InputAvPersoner nesteSide={"oppsummering"} />
                </SkjemaRamme>
              </SkjemaProvider>
            </Route>
            <Route exact path="/skjema/oppsummering/:id">
              <SkjemaProvider>
                <SkjemaRamme>
                  <Oppsummering nesteSide={"kvittering"} />
                </SkjemaRamme>
              </SkjemaProvider>
            </Route>
          </Router>
        </OrganisasjonsListeProvider>
      </LoginBoundary>
    </div>
  );
}

export default App;
