import React, { Context, FunctionComponent, useEffect, useState } from "react";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import { hentOrganisasjonerFraAltinn } from "../api/AltinnApi";

export type OrganisajonsContext = {
  organisasjoner: Array<Organisasjon>;
};

const OrganisasjonsListeContext = React.createContext<OrganisajonsContext>(
  {} as OrganisajonsContext
);
export { OrganisasjonsListeContext };

export const OrganisasjonsListeProvider: FunctionComponent = props => {
  const [organisasjoner, setOrganisasjoner] = useState(Array<Organisasjon>());
  let defaultContext: OrganisajonsContext = {
    organisasjoner
  };
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    hentOrganisasjonerFraAltinn(signal)
      .then(organisasjonsliste => {
        setOrganisasjoner(
          organisasjonsliste.filter(
            organisasjon =>
              organisasjon.OrganizationForm === "BEDR" ||
              organisasjon.Type === "Enterprise"
          )
        );
      })
      .catch(e => {
        setOrganisasjoner([]);
        //setVisFeilmelding(true);
      });
  }, []);
  return (
    <>
      <OrganisasjonsListeContext.Provider value={defaultContext}>
        {props.children}
      </OrganisasjonsListeContext.Provider>
    </>
  );
};
