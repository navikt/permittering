import React, { FunctionComponent } from 'react';
import './Skjema.less';
import Systemtittel from "nav-frontend-typografi/lib/systemtittel";
import Input from "nav-frontend-skjema/lib/input";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";

const Side1: FunctionComponent= () => {
  return (
     <>
       <Sidetittel>Kontaktinformasjon</Sidetittel>
          <Systemtittel className={'skjema-innhold__side-1-systemtittel'}>Informasjon om arbeidsgiver</Systemtittel>
          <Input className={'skjema-innhold__side-1-input-felt'} label="Bedriftens navn"/>
          <div className={'skjema-innhold__side-1-linje-2'}>
            <Input className={'skjema-innhold__side-1-input-felt'} label="Bedriftsnummer"/>
            <Input className={'skjema-innhold__side-1-input-felt'} label="Org.nr"/>
          </div>
          <Systemtittel>Kontaktperson i virksomheten</Systemtittel>
          <div className={'skjema-innhold__side-1-linje-4'}>
            <Input className={'skjema-innhold__side-1-input-felt'} label="Navn"/>
            <Input className={'skjema-innhold__side-1-input-felt'} label="Telefonnummer"/>
          </div>
          <Hovedknapp>Gå videre</Hovedknapp>
      </>

  );
};

export default Side1;
