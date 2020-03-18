import React, { FunctionComponent, useState } from "react";
import "./Datovelger.less";
import kalender from "./kalender.svg";
import "react-day-picker/lib/style.css";
import { Collapse } from "react-collapse";
import Input from "nav-frontend-skjema/lib/input";
import DayPicker from "react-day-picker";
import { skrivOmDato, skrivOmDatoStreng } from "./datofunksjoner";
import { Label } from "nav-frontend-skjema";
import { guid } from "nav-frontend-js-utils";

interface Props {
  overtekst: string;
  value?: string;
  onChange: (event: any) => void;
  disabled?: boolean;
}

const Datovelger: FunctionComponent<Props> = props => {
  const [erApen, setErApen] = useState(false);
  const [editing, setEditing] = useState(false);
  const selectedDate = new Date(props.value || new Date());
  const [tempDate, setTempDate] = useState(skrivOmDato(selectedDate));
  const datovelgerId = guid();
  return (
    <div className={"datofelt"}>
      <Label htmlFor={datovelgerId}>{props.overtekst}</Label>
      <div className={"datofelt__input-container"}>
        <Input
          disabled={props.disabled}
          id={datovelgerId}
          aria-label="Skriv startdato:"
          value={editing ? tempDate : skrivOmDato(selectedDate)}
          className={"datofelt__input"}
          onChange={event => {
            setEditing(true);
            setTempDate(event.currentTarget.value);
          }}
          onBlur={event => {
            setEditing(false);
            const newDato = skrivOmDatoStreng(event.currentTarget.value);
            if (newDato) {
              props.onChange({
                currentTarget: {
                  value: newDato
                }
              });
            }
          }}
        />
        <button
          disabled={props.disabled}
          className={"datofelt__knapp"}
          onClick={() => setErApen(!erApen)}
        >
          <img alt={""} src={kalender} />
        </button>
      </div>
      <Collapse isOpened={erApen}>
        <DayPicker
          selectedDays={selectedDate}
          month={selectedDate}
          firstDayOfWeek={1}
          onDayClick={day => {
            props.onChange({
              currentTarget: {
                value: day
              }
            });
            setErApen(false);
          }}
        />
      </Collapse>
    </div>
  );
};

export default Datovelger;
