import React, { FunctionComponent, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import './HovedBanner.less';

const lagBannerTittel = (type: string): string => {
    if (type === 'MASSEOPPSIGELSE') {
        return 'Si opp ansatte';
    } else if (type === 'PERMITTERING_UTEN_LØNN') {
        return 'Permittere ansatte';
    } else if (type === 'INNSKRENKNING_I_ARBEIDSTID') {
        return 'Innskrenke arbeidstiden til ansatte';
    }
    return 'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';
};

interface Props extends RouteComponentProps {
    byttOrganisasjon?: (org: Organisasjon) => void;
    sidetittel: string;
}

const Banner: FunctionComponent<Props> = props => {
    const { sidetittel, history } = props;
    const [bannerTekst, setBannerTekst] = useState<string>('');

    const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
        if (organisasjon) {
            //endreOrganisasjon(organisasjon);
        }
    };

    useEffect(() => {
        if (sidetittel) {
            setBannerTekst(lagBannerTittel(sidetittel));
        }
    }, [sidetittel]);

    return (
        <Bedriftsmeny
            sidetittel={bannerTekst}
            organisasjoner={[]}
            onOrganisasjonChange={onOrganisasjonChange}
            history={history}
        />
    );
};

export default withRouter(Banner);
