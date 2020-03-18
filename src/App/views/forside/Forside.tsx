import React, { useEffect } from "react";
import SkjemaTabell from "./komponenter/SkjemaTabell";
import HvitSideBoks from "../../komponenter/HvitSideBoks";
import { Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { Knapp } from "nav-frontend-knapper";
import { hentOrganisasjonerFraAltinn } from "../../../api/AltinnApi";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";

const dummySkjemaer = [
  {
    id: "3a30b012-f73f-4333-822c-04ce290f2685",
    orgnr: "123",
    navn: "Andersens IT-tjenester",
    antallBerort: 123
  },
  {
    id: "75dc295a-d72e-485b-a286-146e53667885",
    orgnr: "123",
    navn: "Pettersens Sko",
    antallBerort: 123
  }
];

interface Props {
  setOrganisasjoner: (organisasjoner: Array<Organisasjon>) => void;
}
const Forside = (props: Props) => {
  const setOrgs = props.setOrganisasjoner;
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    hentOrganisasjonerFraAltinn(signal).then(organisasjonsliste => {
      setOrgs(
        organisasjonsliste.filter(
          organisasjon =>
            organisasjon.OrganizationForm === "BEDR" ||
            organisasjon.Type === "Enterprise"
        )
      );
    });
  }, [setOrgs]);

  return (
    <HvitSideBoks>
      <Undertittel>Eksisterende varsler</Undertittel>
      <Knapp>
        <Lenke href={"/skjema/start"}>Nytt skjema</Lenke>
      </Knapp>
      <SkjemaTabell skjemaer={dummySkjemaer} />
    </HvitSideBoks>
  );
};
export default Forside;
