import React, {FunctionComponent} from "react";
import "./AlternativBoks.less";
import Radio from "nav-frontend-skjema/lib/radio";
import Element from "nav-frontend-typografi/lib/element";

interface Props {
    overskrift: string;
    radioknappSkrift: string;
    innholdstekst: string;
    onChange: () => void;
}

const AlternativBoks: FunctionComponent<Props> = props => {
  return (
    <div className="alternativ-boks">
      <div className={"alternativ-boks__radiobutton"}>
          <Radio
              label={<Element>{props.radioknappSkrift}</Element>}
              name="minRadioKnapp"
              onChange={props.onChange}
          />
      </div>
      <Element>{props.overskrift}</Element>
      {props.innholdstekst}
    </div>
  );
};

export default AlternativBoks;
