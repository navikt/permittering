import React from 'react';
import './App.css';
import {basename} from "./paths";
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
      <div className="app">
        <Router basename={basename}>
          <Route exact path="/">
            Hovedside
          </Route>
          <Route exact path="/permitteringsskjema">
            Permetteringsskjema
          </Route>
          </Router>

      </div>
  );
}

export default App;
