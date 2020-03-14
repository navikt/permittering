import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import './HovedBanner.less';
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";

interface Props extends RouteComponentProps {
    byttOrganisasjon?: (org: Organisasjon) => void;
    organisasjoner: Organisasjon[];
}

const Banner: FunctionComponent<Props> = props => {

    const { history } = props;
    const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
        if (organisasjon) {
            //endreOrganisasjon(organisasjon);
        }
    };

    return (
        <Bedriftsmeny
            sidetittel="Min side – arbeidsgiver"
            organisasjoner={props.organisasjoner}
            onOrganisasjonChange={onOrganisasjonChange}
            history={history}
        />
    );
};

export default withRouter(Banner);