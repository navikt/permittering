import React, { FunctionComponent, useContext } from "react";
import "./Skjema.less";
import Systemtittel from "nav-frontend-typografi/lib/systemtittel";
import Input from "nav-frontend-skjema/lib/input";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";
import SkjemaContext from "../SkjemaContext/SkjemaContext";

interface Props {
  byttSide: (indeks: number) => void;
}

const Side1: FunctionComponent<Props> = props => {

  const context = useContext(SkjemaContext);
  return (
    <div>
      <Sidetittel>Kontaktinformasjon</Sidetittel>
      <Systemtittel className={"skjema-innhold__side-1-systemtittel"}>
        Informasjon om arbeidsgiver
      </Systemtittel>
      <Input
        className={"skjema-innhold__side-1-input-felt"}
        label="Bedriftens navn"
      />
      <div className={"skjema-innhold__side-1-linje-2"}>
        <Input
          className={"skjema-innhold__side-1-input-felt"}
          label="Bedriftsnummer"
        />
        <Input
          className={"skjema-innhold__side-1-input-felt"}
          label="Org. nr."
          defaultValue={context.skjema.orgNr}
          onChange={event =>
            context.endreSkjemaVerdi("orgNr", event.currentTarget.value)
          }
        />
      </div>
      <Systemtittel>Kontaktperson i virksomheten</Systemtittel>
      <div className={"skjema-innhold__side-1-linje-4"}>
        <Input
          className={"skjema-innhold__side-1-input-felt"}
          label="Navn"
          defaultValue={context.skjema.kontaktNavn}
          onChange={event =>
            context.endreSkjemaVerdi("kontaktNavn", event.currentTarget.value)
          }
        />
        <Input
          className={"skjema-innhold__side-1-input-felt"}
          label="Telefonnummer"
          defaultValue={context.skjema.kontaktTlf}
          onChange={event =>
              context.endreSkjemaVerdi("kontaktTlf", event.currentTarget.value)
          }
        />
      </div>
      <Hovedknapp onClick={() => context.lagre }>Gå videre</Hovedknapp>
    </div>
  );
};

export default Side1;
