import React, { useEffect } from "react";
import SkjemaTabell from "./komponenter/SkjemaTabell";
import HvitSideBoks from "../../komponenter/HvitSideBoks";
import { Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { Knapp } from "nav-frontend-knapper";
import { PermitteringsskjemaITabell } from "../../../types/permitteringsskjema";
import { hentOrganisasjonerFraAltinn } from "../../../api/AltinnApi";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";

const dummySkjemaer: PermitteringsskjemaITabell[] = [
  {
    id: "3a30b012-f73f-4333-822c-04ce290f2685",
    bedriftNr: "123",
    bedriftNavn: "Andersens IT-tjenester",
    antallBerørt: 123,
    sendtInn: "2020-03-18T13:31:15.971Z"
  },
  {
    id: "75dc295a-d72e-485b-a286-146e53667885",
    bedriftNr: "123",
    bedriftNavn: "Pettersens Sko",
    antallBerørt: 123,
    sendtInn: "2020-03-18T13:31:15.971Z"
  }
];

interface Props {
  setOrganisasjoner: (organisasjoner: Array<Organisasjon>) => void;
}
const Forside = (props: Props) => {
  const setOrgs = props.setOrganisasjoner;

  return (
    <HvitSideBoks>
      <Undertittel>Eksisterende varsler</Undertittel>
      <Knapp>
        <Lenke href={"/permittering/skjema/start"}>Nytt skjema</Lenke>
      </Knapp>
      <SkjemaTabell skjemaer={dummySkjemaer} />
    </HvitSideBoks>
  );
};
export default Forside;
