import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import './HovedBanner.less';
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";
import {mockedeOrganisasjoner} from "../mocking/Organisasjoner";

const Banner: FunctionComponent<RouteComponentProps> = props => {

    const { history } = props;
    const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
        if (organisasjon) {
            //endreOrganisasjon(organisasjon);
        }
    };
    const Organisasjoner = mockedeOrganisasjoner;

    return (
        <Bedriftsmeny
            sidetittel="Min side – arbeidsgiver"
            organisasjoner={Organisasjoner}
            onOrganisasjonChange={onOrganisasjonChange}
            history={history}
        />
    );
};

export default withRouter(Banner);
