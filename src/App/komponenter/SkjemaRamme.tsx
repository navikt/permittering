import React, { FunctionComponent } from "react";
import "./SkjemaRamme.less";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";
import { useHistory, useParams } from "react-router-dom";
import { StegindikatorStegProps } from "nav-frontend-stegindikator/lib/stegindikator-steg";
import {
  createSkjemaPath,
  SkjemaSideProps,
  skjemaSteg
} from "../Skjema/skjema-steg";

const SkjemaRamme: FunctionComponent<SkjemaSideProps> = ({ children }) => {
  const history = useHistory();
  let { id } = useParams();
  const steg = skjemaSteg(history.location.pathname);
  const skiftSide = (index: number) => {
    history.push(createSkjemaPath(steg[index].slug, id));
  };
  return (
    <>
      <div className="skjema-container">
        <Stegindikator
          steg={steg as StegindikatorStegProps[]}
          onChange={index => skiftSide(index)}
          visLabel
          autoResponsiv
        />
        <div className="skjema-innhold">{children}</div>
      </div>
    </>
  );
};

export default SkjemaRamme;
