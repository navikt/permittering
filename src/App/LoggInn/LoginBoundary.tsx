import React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';


import LoggInn from "./LoggInn";
import environment from "../../utils/environment";
import hentVeilarbStatus from "../../api/veilarbApi";



export enum Tilgang {
  LASTER,
  IKKE_TILGANG,
  TILGANG
}

const LoginBoundary: FunctionComponent = props => {
  const [innlogget, setInnlogget] = useState(Tilgang.LASTER);

  function localLogin() {
    if (document.cookie.includes('selvbetjening-idtoken')) {
      setInnlogget(Tilgang.TILGANG);
    } else {
      setInnlogget(Tilgang.IKKE_TILGANG);
    }
  }

  useEffect(() => {
    setInnlogget(Tilgang.LASTER);
    const getLoginStatus = async () => {
      if (environment.MILJO === 'prod-sbs' || environment.MILJO === 'dev-sbs') {
        let veilarbStatusRespons = await hentVeilarbStatus();
        if (veilarbStatusRespons.harGyldigOidcToken && veilarbStatusRespons.nivaOidc === 4) {
          setInnlogget(Tilgang.TILGANG);
        } else if (!veilarbStatusRespons.harGyldigOidcToken) {
          setInnlogget(Tilgang.IKKE_TILGANG);
        }
      } else {
        localLogin();
      }
    };
    getLoginStatus();
  }, []);

  if (innlogget === Tilgang.TILGANG) {
    return <> {props.children} </>;
  }
  if (innlogget === Tilgang.IKKE_TILGANG) {
    return <LoggInn />;
  } else {
    return null;
  }
};

export default LoginBoundary;
