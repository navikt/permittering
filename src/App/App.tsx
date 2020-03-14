import React, {useEffect, useState} from 'react';
import './App.less';
import {basename} from "./paths";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoggInn from "./LoggInn/LoggInn";
import Banner from "./HovedBanner/HovedBanner";
import {hentOrganisasjonerFraAltinn} from "./LoggInn/api/AltinnApi";
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";


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
        <Router basename={basename}>
          <Banner organisasjoner={organisasjoner}/>
          <Route exact path="/">
            <LoggInn/>
          </Route>
          <Route exact path="/permitteringsskjema">
            Permitteringsskjema
          </Route>
          </Router>
      </div>
  );
}

export default App;
