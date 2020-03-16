import React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import hentVeilarbStatus from "./api/veilarbApi";
import LoggInn from "./App/LoggInn/LoggInn";

export enum Tilgang {
  LASTER,
  IKKE_TILGANG,
  TILGANG
}

const LoginBoundary: FunctionComponent = props => {
  const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

  const localLogin = () => {
    console.log("lokal logging kallt");
    if (document.cookie.includes('selvbetjening-idtoken')) {
      setInnlogget(Tilgang.TILGANG);
    } else {
      setInnlogget(Tilgang.IKKE_TILGANG);
    }
  };

  useEffect(() => {
    setInnlogget(Tilgang.LASTER);
    const getLoginStatus = async () => {
      if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_ON_HEROKU === 'true') {
        localLogin();
      }
      else {
        let veilarbStatusRespons = await hentVeilarbStatus();
        if (veilarbStatusRespons.harGyldigOidcToken && veilarbStatusRespons.nivaOidc === 4) {
          setInnlogget(Tilgang.TILGANG);
        } else if (!veilarbStatusRespons.harGyldigOidcToken) {
          setInnlogget(Tilgang.IKKE_TILGANG);
        }
      }

    };
    getLoginStatus();
  }, []);

  if (innlogget === Tilgang.TILGANG) {
    return <> {props.children} </>;
  }
  if (innlogget === Tilgang.IKKE_TILGANG) {
    if (window.location.href ) {
      return <LoggInn />;
    }
    else {
      return null;
    }
  } else {
    return null;
  }
};

export default LoginBoundary;
