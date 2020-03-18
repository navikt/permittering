import React, { FunctionComponent, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import Bedriftsmeny from "@navikt/bedriftsmeny";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";

import "./HovedBanner.less";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import { OrganisasjonsListeContext } from "../OrgnisasjonslisteProvider";

interface Props extends RouteComponentProps {
  byttOrganisasjon?: (org: Organisasjon) => void;
}

const Banner: FunctionComponent<Props> = props => {
  const { organisasjoner } = useContext(OrganisasjonsListeContext);
  const { history } = props;
  const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
    if (organisasjon) {
      //endreOrganisasjon(organisasjon);
    }
  };

  return (
    <Bedriftsmeny
      sidetittel="Permittering"
      organisasjoner={organisasjoner}
      onOrganisasjonChange={onOrganisasjonChange}
      history={history}
    />
  );
};

export default withRouter(Banner);
