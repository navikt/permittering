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

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentOrganisasjonerFraAltinn(signal)
            .then(organisasjonsliste => {
                setOrganisasjoner(
                    organisasjonsliste.filter(
                        organisasjon =>
                            organisasjon.OrganizationForm === 'BEDR' ||
                            organisasjon.Type === 'Enterprise'
                    )
                );
                if (organisasjoner.length > 0) setOrganisasjonslisteFerdigLastet(Tilgang.TILGANG);
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
