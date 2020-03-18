import React, { FunctionComponent } from "react";
import "./SkjemaRamme.less";
import Stegindikator from "nav-frontend-stegindikator/lib/stegindikator";
import { useHistory, useParams } from "react-router-dom";
import Knapp from "nav-frontend-knapper/lib/knapp";

export interface SkjemaSideProps {
  nesteSide: string;
}

export const createSkjemaPath = (slug: string, id?: string) => {
  return ["", "skjema", slug, id].join("/");
};
const SkjemaRamme: FunctionComponent = props => {
  const history = useHistory();
  let { id } = useParams();
  const steg = [
    {
      label: "Kontakinformasjon",
      aktiv: false,
      slug: "kontaktinformasjon"
    },
    {
      label: "Generelle opplysninger",
      aktiv: false,
      slug: "generelle-opplysninger"
    },
    {
      label: "Hvem rammes",
      aktiv: false,
      slug: "hvem-rammes"
    },
    {
      label: "Oppsummering",
      aktiv: false,
      slug: "oppsummering"
    }
  ].map((item, index) => ({
    ...item,
    index,
    aktiv: history.location.pathname.includes(item.slug)
  }));
  const skiftSide = (index: number) => {
    history.push(createSkjemaPath(steg[index].slug, id));
  };
  return (
    <>
      <div className="skjema-container">
        <Stegindikator
          steg={steg}
          onChange={index => skiftSide(index)}
          visLabel
          autoResponsiv
        />

        <div className="skjema-innhold">{props.children}</div>
      </div>
    </>
  );
};

export default SkjemaRamme;
