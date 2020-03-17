import React, {FunctionComponent, useEffect, useState} from 'react';
import './Skjema.less';
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";
import Side1 from "./Side1";
import InputAvPersoner from "../views/input-av-personer/InputAvPersoner";
import {hentOrganisasjonerFraAltinn} from "../../api/AltinnApi";

const Skjema: FunctionComponent= () => {
  const [steg, setSteg] = useState(1);

  useEffect(() => {
   setSteg(3);
  }, []);

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
          {steg === 1 && <Side1/>}
          {steg === 3 && <InputAvPersoner/>}
        </div>
      </div>
  );
};

export default Skjema;
