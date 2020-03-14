import React from 'react';
import './App.less';
import {basename} from "./paths";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoggInn from "./LoggInn/LoggInn";


function App() {
  return (
      <div className="app">
        <Router basename={basename}>
          <Route exact path="/">
            <LoggInn/>
          </Route>
          <Route exact path="/permitteringsskjema">
            Permetteringsskjema
          </Route>
          </Router>

      </div>
  );
}

export default App;
