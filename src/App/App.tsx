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
import Side1 from "./Skjema/Side1";

function App() {
  const [organisasjoner, setorganisasjoner] = useState(Array<Organisasjon>());
  const [naVarendeSide, setNavarendneSide] = useState(0);

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
          <Banner organisasjoner={organisasjoner} />
          <Route exact path="/">
            <HvaSkalDuRapportere byttSide={setNavarendneSide}/>
          </Route>
          <Route exact path="/skjema">
          <HvaSkalDuRapportere byttSide={setNavarendneSide}/>
          </Route>
          <Route exact path="/skjema/side1">
            <SkjemaProvider>
              <Skjema skjema={<Side1/>} naVarendeSteg={1} stegNummer={1} byttSide={setNavarendneSide}/>
            </SkjemaProvider>
          </Route>
          <Route exact path="/skjema/side3">
            <SkjemaProvider>
              <Skjema skjema={<InputAvPersoner/>} stegNummer={3} naVarendeSteg={naVarendeSide} byttSide={setNavarendneSide}/>
            </SkjemaProvider>
          </Route>
        </Router>
      </LoginBoundary>
    </div>
  );
}

export default App;
