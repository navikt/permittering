import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import { Organisasjon } from '../types/Organisasjon';
import { hentOrganisasjonerFraAltinn } from '../api/AltinnApi';
import IkkeTilgang from './IkkeTilgang/IkkeTilgang';

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

export const OrganisasjonsListeProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [organisasjoner, setOrganisasjoner] = useState(Array<Organisasjon>());
    const [organisasjonslisteFerdigLastet, setOrganisasjonslisteFerdigLastet] = useState(
        Tilgang.LASTER
    );

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        hentOrganisasjonerFraAltinn(signal)
            .then((organisasjonsliste) => {
                const kunBedrifter = organisasjonsliste.filter(
                    (organisasjon) =>
                        organisasjon.OrganizationForm === 'BEDR' ||
                        organisasjon.OrganizationForm === 'AAFY'
                );
                setOrganisasjoner(kunBedrifter);
                if (kunBedrifter.length > 0) setOrganisasjonslisteFerdigLastet(Tilgang.TILGANG);
                else {
                    setOrganisasjonslisteFerdigLastet(Tilgang.IKKE_TILGANG);
                }
            })
            .catch((e) => {
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
                    <OrganisasjonsListeContext.Provider value={defaultContext}>
                        {props.children}
                    </OrganisasjonsListeContext.Provider>
                )}
        </>
    );
};
