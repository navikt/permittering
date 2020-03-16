import React, { FunctionComponent } from 'react';
import './HvaSkalDuRapportere.less';
import Undertittel from "nav-frontend-typografi/lib/undertittel";
import Innholdstittel from "nav-frontend-typografi/lib/innholdstittel";
import AlternativBoks from "./AlternativBoks/AlternativBoks";

interface Props  {

}

const HvaSkalDuRapportere: FunctionComponent<Props> = props => {
  return (
      <div className="hva-skal-du-rapportere">
        <Innholdstittel>Hva skal du rapportere til oss</Innholdstittel>
        <div className={'hva-skal-du-rapportere__boks-container'}>
        <AlternativBoks/>
          <AlternativBoks/>
          <AlternativBoks/>
        </div>
      </div>
  );
};

export default HvaSkalDuRapportere;
