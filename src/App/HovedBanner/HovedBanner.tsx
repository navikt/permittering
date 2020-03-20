import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';

import './HovedBanner.less';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';

interface Props extends RouteComponentProps {
    byttOrganisasjon?: (org: Organisasjon) => void;
    sidetittel: string;
}

const Banner: FunctionComponent<Props> = props => {
    const { history } = props;
    const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
        if (organisasjon) {
            //endreOrganisasjon(organisasjon);
        }
    };

    const lagBannerTittel = (type: string) => {
        switch (true) {
            case type === 'MASSEOPPSIGELSE':
                return 'Si opp ansatte';
            case type === 'PERMITTERING_UTEN_LØNN':
                return 'Permittere ansatte';
            case type === 'INNSKRENKNING_I_ARBEIDSTID':
                return 'Innskrenke arbeidstiden til ansatte';
        }
        return 'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';
    };

    const sidetittel = lagBannerTittel(props.sidetittel);

    return (
        <Bedriftsmeny
            sidetittel={sidetittel}
            organisasjoner={[]}
            onOrganisasjonChange={onOrganisasjonChange}
            history={history}
        />
    );
};

export default withRouter(Banner);
