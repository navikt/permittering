import React, { FunctionComponent } from "react";
import "./Skjema.less";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";

interface Props {
  skjema: any;
  stegNummer: number;
  naVarendeSteg: number;
  byttSide: (indeks: number) => void;
}

const SkjemaRamme: FunctionComponent<Props> = props => {
  const skiftSide = (side: number) => {
    console.log(side);
    props.byttSide(side);
    window.location.href = "/permittering/skjema/side" + side;
  };

  const side1 = window.location.href.includes("side1");
  const side2 = window.location.href.includes("side2");
  const side3 = window.location.href.includes("side3");

  return (
    <div className="skjema-container">
      <Stegindikator
        steg={[
          { label: "Kontakinformasjon", aktiv: side1, index: 0 },
          { label: "Hvem rammes", aktiv: side2, index: 1 },
          { label: "Se igjennom", aktiv: side3, index: 2 }
        ]}
        onChange={index => {
          console.log(index, "Onchange kallt");
          skiftSide(index + 1);
        }}
        visLabel
        autoResponsiv
      />
      <div className="skjema-innhold">{props.skjema}</div>
    </div>
  );
};

export default SkjemaRamme;
