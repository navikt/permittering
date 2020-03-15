import React, {useEffect, useState} from 'react';
import './App.less';
import {basename} from "./paths";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Banner from "./HovedBanner/HovedBanner";
import {hentOrganisasjonerFraAltinn} from "../api/AltinnApi";
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";
import LoginBoundary from "../LoginBoundary";

function App() {
  const [organisasjoner, setorganisasjoner] = useState(Array<Organisasjon>());


  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    hentOrganisasjonerFraAltinn(signal)
        .then(organisasjonsliste => {
              setorganisasjoner(
                  organisasjonsliste.filter(
                      organisasjon => organisasjon.OrganizationForm === 'BEDR' || organisasjon.Type === 'Enterprise'
                  )
              )
            }
        );
  }, []);

  console.log(organisasjoner);

  return (
      <div className="app">

        <LoginBoundary>
          <Router basename={basename}>
          <Banner organisasjoner={organisasjoner}/>
          <Route exact path="/">
            Her kan du registrere permitteringsskjema
          </Route>
          <Route exact path="/permitteringsskjema">
            Permitteringsskjema
          </Route>
          </Router>
        </LoginBoundary>
      </div>
  );
}

export default App;
