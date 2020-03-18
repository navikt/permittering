import React, { FunctionComponent, useContext, useState } from "react";
import "./HvaSkalDuRapportere.less";
import Innholdstittel from "nav-frontend-typografi/lib/innholdstittel";
import AlternativBoks from "./AlternativBoks/AlternativBoks";
import Checkbox from "nav-frontend-skjema/lib/checkbox";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Ingress from "nav-frontend-typografi/lib/ingress";
import { useHistory } from "react-router-dom";
import SkjemaContext from "../SkjemaContext/SkjemaContext";
import { Permitteringsskjema } from "../../types/permitteringsskjema";

/*
interface Props {
    byttSide: (indeks: number) => void;
}
*/
const HvaSkalDuRapportere: FunctionComponent = props => {
  const context = useContext(SkjemaContext);

  const [skjemaType, setSkjemaType] = useState<
    Permitteringsskjema["type"] | undefined
  >("PERMITTERING_UTEN_LØNN");
  const [diskutertMedAnsatte, setDiskutertMedAnsatte] = useState(false);
  const history = useHistory();
  const opprettOgNavigerTilSkjema = async () => {
    const newId = await context.opprett({
      bedriftNr: "9999999",
      type: skjemaType!
    });
    history.push("/skjema/kontaktinformasjon/" + newId);
  };

  return (
    <div className="hva-skal-du-rapportere">
      <Innholdstittel>Hva skal du rapportere til oss</Innholdstittel>
      <div className={"hva-skal-du-rapportere__boks-container"}>
        <AlternativBoks
          innholdstekst={
            "Over til personer osv osv, there is something about parenthood. gives a sense.\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet"
          }
          overskrift={"Masseoppsigelser"}
          radioknappSkrift={"Masseoppsigelser"}
          onChange={() => setSkjemaType("MASSEOPPSIGELSE")}
        />
        <AlternativBoks
          innholdstekst={
            "Over til personer osv osv, there is something about parenthood. gives a sense.\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet"
          }
          overskrift={"Masseptermittering uten lønn"}
          radioknappSkrift={"Masseptermittering uten lønn"}
          onChange={() => setSkjemaType("PERMITTERING_UTEN_LØNN")}
        />
        <AlternativBoks
          innholdstekst={
            "Over til personer osv osv, there is something about parenthood. gives a sense.\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet\n" +
            "        bla bla bla bla. send in to a great rooted desire. sende dette skjeamet"
          }
          overskrift={"Innskrenkning av arbeidstid"}
          radioknappSkrift={"Innskrenkning av arbeidstid"}
          onChange={() => setSkjemaType("INNSKRENKNING_I_ARBEIDSTID")}
        />
      </div>
      <div className={"hva-skal-du-rapportere__har-varslet"}>
        <Checkbox
          onChange={() => setDiskutertMedAnsatte(!diskutertMedAnsatte)}
          label={<Ingress>Jeg har varslet det ansatte det gjelder</Ingress>}
        />
      </div>
      <Hovedknapp
        disabled={!diskutertMedAnsatte || skjemaType === undefined}
        className={"hva-skal-du-rapportere__hoved-knapp"}
        onClick={opprettOgNavigerTilSkjema}
      >
        Gå til skjema
      </Hovedknapp>
    </div>
  );
};

export default HvaSkalDuRapportere;
