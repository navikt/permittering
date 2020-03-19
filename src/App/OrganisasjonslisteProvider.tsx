import React, { FunctionComponent, useEffect, useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { hentOrganisasjonerFraAltinn } from '../api/AltinnApi';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

export type OrganisajonsContext = {
    organisasjoner: Array<Organisasjon>;
    organisasjonslisteFerdigLastet: Tilgang;
    valgtOrganisasjon: null | Organisasjon;
    endreOrganisasjon: (org: Organisasjon) => void;
};

const OrganisasjonsListeContext = React.createContext<OrganisajonsContext>(
    {} as OrganisajonsContext
);
export { OrganisasjonsListeContext };

export const OrganisasjonsListeProvider: FunctionComponent = props => {
    const [organisasjoner, setOrganisasjoner] = useState(Array<Organisasjon>());
    const [organisasjonslisteFerdigLastet, setOrganisasjonslisteFerdigLastet] = useState(
        Tilgang.LASTER
    );
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState<null | Organisasjon>(null);

    const endreOrganisasjon = async (org?: Organisasjon) => {
        console.log('endre org kallt');
        if (org) {
            await setValgtOrganisasjon(org);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentOrganisasjonerFraAltinn(signal)
            .then(organisasjonsliste => {
                setOrganisasjoner(
                    organisasjonsliste.filter(
                        organisasjon => organisasjon.OrganizationForm === 'BEDR'
                    )
                );
                if (organisasjonsliste.length > 0)
                    setOrganisasjonslisteFerdigLastet(Tilgang.TILGANG);
                else {
                    setOrganisasjonslisteFerdigLastet(Tilgang.IKKE_TILGANG);
                }
            })
            .catch(e => {
                setOrganisasjoner([]);
                //setVisFeilmelding(true);
            });
    }, []);

    let defaultContext: OrganisajonsContext = {
        organisasjoner,
        organisasjonslisteFerdigLastet,
        valgtOrganisasjon,
        endreOrganisasjon,
    };
    return (
        <>
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER && (
                <OrganisasjonsListeContext.Provider value={defaultContext}>
                    {props.children}
                </OrganisasjonsListeContext.Provider>
            )}
        </>
    );
};
