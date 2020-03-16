import React, { FunctionComponent } from 'react';
import './Skjema.less';
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";
import Side1 from "./Side1";

const Skjema: FunctionComponent= () => {
  return (
      <div className="skjema-container">
        <Stegindikator
            steg={[
              {"label": "Kontakinformasjon","aktiv": true, index: 1},
              {"label": "Hvem rammes",  index: 2},
              {"label": "Se igjennom", index: 3}
            ]}
            onChange={() => {}}
            visLabel
            autoResponsiv
        />
        <div className="skjema-innhold">
         <Side1/>
        </div>
      </div>
  );
};

export default Skjema;
