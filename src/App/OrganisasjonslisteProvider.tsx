import React, { FunctionComponent, useEffect, useState } from 'react';
import { JuridiskEnhetMedUnderEnheterArray, Organisasjon } from '../types/Organisasjon';
import { hentOrganisasjonerFraAltinn } from '../api/AltinnApi';
import IkkeTilgang from './IkkeTilgang/IkkeTilgang';
import { byggOrganisasjonstre } from '../utils/byggOrganisasjonsTre';

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

export type OrganisajonsContext = {
    organisasjoner: Array<Organisasjon>;
    organisasjonslisteFerdigLastet: Tilgang;
    organisasjonstre: JuridiskEnhetMedUnderEnheterArray[];
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
    const [organisasjonstre, setOrganisasjonstre] = useState<JuridiskEnhetMedUnderEnheterArray[]>(
        []
    );

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentOrganisasjonerFraAltinn(signal)
            .then(organisasjonsliste => {
                const kunBedrifter = organisasjonsliste.filter(
                    organisasjon =>
                        organisasjon.OrganizationForm === 'BEDR' ||
                        organisasjon.OrganizationForm === 'AAFY'
                );
                setOrganisasjoner(kunBedrifter);
                if (kunBedrifter.length > 0) {
                    byggOrganisasjonstre(organisasjonsliste).then(tre => setOrganisasjonstre(tre));

                    setOrganisasjonslisteFerdigLastet(Tilgang.TILGANG);
                } else {
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
        organisasjonstre,
    };

    return (
        <>
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER &&
                organisasjonslisteFerdigLastet === Tilgang.IKKE_TILGANG && <IkkeTilgang />}
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER &&
                organisasjonslisteFerdigLastet === Tilgang.TILGANG && (
                    <OrganisasjonsListeContext.Provider value={defaultContext}>
                        {props.children}
                    </OrganisasjonsListeContext.Provider>
                )}
        </>
    );
};
