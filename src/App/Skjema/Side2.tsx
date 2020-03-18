import React, { FunctionComponent, useContext, useState } from "react";
import "./Skjema.less";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";
import SkjemaContext from "../SkjemaContext/SkjemaContext";
import { TextareaControlled } from "nav-frontend-skjema";
import Checkbox from "nav-frontend-skjema/lib/checkbox";
import Knapp from "nav-frontend-knapper/lib/knapp";
import "react-day-picker/lib/style.css";

import { createSkjemaPath, SkjemaSideProps } from "../komponenter/SkjemaRamme";
import { useHistory } from "react-router-dom";
import Datovelger from "./Datovelger/Datovelger";

const Side2: FunctionComponent<SkjemaSideProps> = props => {
  const context = useContext(SkjemaContext);
  const history = useHistory();
  const [startDato, setStartDato] = useState("");
  const [sluttDato, setSluttDato] = useState("");

  console.log(sluttDato, startDato);

  return (
    <>
      <Sidetittel>Generelle opplysninger</Sidetittel>
      <div className={"skjema-innhold__side-2-text-area"}>
        <TextareaControlled
          label="Hva er årsaken til permitteringen"
          defaultValue={""}
          maxLength={0}
        />
      </div>
      <div className={"skjema-innhold__side-2-text-area"}>
        <TextareaControlled
          label="Hvilke arbeidsgrupper (yrkeskategorier) tilhører de berørte"
          defaultValue={""}
          maxLength={0}
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
        <TextareaControlled
          label="Eventuelle andre opplysninger"
          defaultValue={""}
          maxLength={0}
        />
      </div>
      <div className={"skjema-innhold__fram-og-tilbake"}>
        <Knapp>Tilbake</Knapp>
        <Hovedknapp
          className={"skjema-innhold__lagre"}
          onClick={() => {
            context.lagre();
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
