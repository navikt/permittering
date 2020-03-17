import React, { FunctionComponent, useState } from "react";
import "./Datovelger.less";

import "react-day-picker/lib/style.css";
import { Collapse } from "react-collapse";
import Input from "nav-frontend-skjema/lib/input";
import DayPicker from "react-day-picker";
import { skrivOmDato } from "./datofunksjoner";

const Datovelger: FunctionComponent = () => {
  const [erApen, setErApen] = useState(false);
  const [skrevetDato, setSkrevetDato] = useState("dd.mm.åååå");
  const [valgtDato, setValgtDato] = useState(new Date());

  console.log(skrevetDato);

  return (
    <div className={"datofelt"}>
      Fra
      <div className={"datofelt__input-container"}>
        <Input
          aria-label="Skriv startdato:"
          onChange={event => setSkrevetDato(event.currentTarget.value)}
          placeholder={skrivOmDato(valgtDato)}
          className={"datofelt__input"}
        />
        <button
          className={"datofelt__knapp"}
          onClick={() => setErApen(!erApen)}
        />
      </div>
      <Collapse isOpened={erApen}>
        <DayPicker onDayClick={day => setValgtDato(day)} />
      </Collapse>
    </div>
  );
};

export default Datovelger;
