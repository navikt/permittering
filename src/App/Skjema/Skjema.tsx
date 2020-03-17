import React, {FunctionComponent} from 'react';
import './Skjema.less';
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";

interface Props {
  skjema: any;
  stegNummer: number;
  naVarendeSteg: number;
  byttSide: (indeks: number) => void;
}

const SkjemaRamme: FunctionComponent<Props> = props => {

  const erAktiv = props.naVarendeSteg === props.stegNummer;
  console.log(props.naVarendeSteg, props.stegNummer, erAktiv);

  const skiftSide = (side: number) => {
    console.log(side);
    props.byttSide(side);
    window.location.href = '/permittering/skjema/side' + side;
  };

  return (
      <div className="skjema-container">
        <Stegindikator
            steg={[
              {"label": "Kontakinformasjon","aktiv": erAktiv, index: 0},
              {"label": "Hvem rammes", "aktiv": erAktiv, index: 1},
              {"label": "Se igjennom","aktiv": erAktiv, index: 2}
            ]}
            onChange={(index) => {console.log(index, 'Onchange kallt'); skiftSide(index+1)}}
            visLabel
            autoResponsiv
        />
        <div className="skjema-innhold">
          {props.skjema}
        </div>
      </div>
  );
};

export default SkjemaRamme;
