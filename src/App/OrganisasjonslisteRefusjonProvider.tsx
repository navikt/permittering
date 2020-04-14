import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentRefusjonOrganisasjonerFraAltinn } from '../api/AltinnApi';
import { Organisasjon } from '../types/Organisasjon';
import IkkeTilgang from './IkkeTilgang/IkkeTilgang';
import { OrganisajonsContext, Tilgang } from './OrganisasjonslisteProvider';

export const RefusjonOrganisasjonsListeContext = React.createContext<OrganisajonsContext>(
    {} as OrganisajonsContext
);

export const RefusjonOrganisasjonsListeProvider: FunctionComponent = props => {
    const [organisasjoner, setOrganisasjoner] = useState(Array<Organisasjon>());
    const [organisasjonslisteFerdigLastet, setOrganisasjonslisteFerdigLastet] = useState(
        Tilgang.LASTER
    );

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentRefusjonOrganisasjonerFraAltinn(signal)
            .then(organisasjonsliste => {
                const kunBedrifter = organisasjonsliste.filter(
                    organisasjon =>
                        organisasjon.OrganizationForm === 'BEDR' ||
                        organisasjon.OrganizationForm === 'AAFY'
                );
                setOrganisasjoner(kunBedrifter);
                if (kunBedrifter.length > 0) setOrganisasjonslisteFerdigLastet(Tilgang.TILGANG);
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
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER &&
                organisasjonslisteFerdigLastet === Tilgang.IKKE_TILGANG && <IkkeTilgang />}
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER &&
                organisasjonslisteFerdigLastet === Tilgang.TILGANG && (
                    <RefusjonOrganisasjonsListeContext.Provider value={defaultContext}>
                        {props.children}
                    </RefusjonOrganisasjonsListeContext.Provider>
                )}
        </>
    );
};
