import React, { FunctionComponent, useContext, useState } from "react";
import "./Skjema.less";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";
import SkjemaContext from "../SkjemaContext/SkjemaContext";
import { Textarea } from "nav-frontend-skjema";
import Checkbox from "nav-frontend-skjema/lib/checkbox";
import Knapp from "nav-frontend-knapper/lib/knapp";
import "react-day-picker/lib/style.css";
import Datovelger from "./Datovelger/Datovelger";
import { createSkjemaPath, SkjemaSideProps } from "../komponenter/SkjemaRamme";
import { useHistory } from "react-router-dom";
import { mergeFritekst, splittOppFritekst } from "./fritekstFunksjoner";

const Side2: FunctionComponent<SkjemaSideProps> = props => {
  const history = useHistory();
  const context = useContext(SkjemaContext);
  const [startDato, setStartDato] = useState("");
  const [sluttDato, setSluttDato] = useState("");
  let aarsak = "";
  let yrker = "";
  let annet = "";
  if (context.skjema.fritekst) {
    const existerendeFelter = splittOppFritekst(context.skjema.fritekst);
    if (existerendeFelter.aarsak) {
      aarsak = existerendeFelter.aarsak;
    }
    if (existerendeFelter.yrker) {
      yrker = existerendeFelter.yrker;
    }
    if (existerendeFelter.annet) {
      annet = existerendeFelter.annet;
    }
  }
  const endreFritekstFelt = (key: string, value: string) => {
    const fritekstFelter: any = { aarsak, yrker, annet };
    fritekstFelter[key] = value;
    context.endreSkjemaVerdi("fritekst", mergeFritekst(fritekstFelter));
  };
  return (
    <>
      <Sidetittel>Generelle opplysninger</Sidetittel>
      <div className={"skjema-innhold__side-2-text-area"}>
        <Textarea
          label="Hva er årsaken til permitteringen"
          value={aarsak}
          maxLength={1000}
          onChange={event =>
            endreFritekstFelt("aarsak", event.currentTarget.value)
          }
        />
      </div>
      <div className={"skjema-innhold__side-2-text-area"}>
        <Textarea
          label="Hvilke arbeidsgrupper (yrkeskategorier) tilhører de berørte"
          value={yrker}
          maxLength={1000}
          onChange={event =>
            endreFritekstFelt("yrker", event.currentTarget.value)
          }
        />
      </div>
      <div className={"skjema-innhold__side-2-dato-container"}>
        <Datovelger setDato={setStartDato} overtekst={"Fra"} />
        <div className={"skjema-innhold__dato-velger-til"}>
          <Datovelger setDato={setSluttDato} overtekst={"Til"} />
          <Checkbox label={"Checkbox"} />
        </div>
      </div>
      <div className={"skjema-innhold__side-2-text-area"}>
        <Textarea
          label="Eventuelle andre opplysninger"
          value={annet}
          maxLength={1000}
          onChange={event =>
            endreFritekstFelt("annet", event.currentTarget.value)
          }
        />
      </div>
      <div className={"skjema-innhold__fram-og-tilbake"}>
        <Knapp>Tilbake</Knapp>
        <Hovedknapp
          className={"skjema-innhold__lagre"}
          onClick={async () => {
            await context.lagre();
            history.push(createSkjemaPath(props.nesteSide, context.skjema.id));
          }}
        >
          Lagre og neste
        </Hovedknapp>
        <Knapp>Fram</Knapp>
      </div>
    </>
  );
};

export default Side2;
