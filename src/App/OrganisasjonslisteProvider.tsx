import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import {Organisasjon} from '../types/Organisasjon';
import {hentOrganisasjonerFraAltinn} from '../api/AltinnApi';
import IkkeTilgang from './IkkeTilgang/IkkeTilgang';
import useSWR from "swr";
import {z} from "zod";

export enum Tilgang {
    LASTER,
    IKKE_TILGANG,
    TILGANG,
}

export type OrganisajonsContext = {
    organisasjoner: Array<Organisasjon>;
};

export const OrganisasjonsListeContext = React.createContext<OrganisajonsContext>(
    {} as OrganisajonsContext
);

export const OrganisasjonsListeProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [organisasjoner, setOrganisasjoner] = useState(Array<Organisasjon>());
    const [organisasjonslisteFerdigLastet, setOrganisasjonslisteFerdigLastet] = useState(
        Tilgang.LASTER
    );

    useEffect(() => {
        hentOrganisasjonerFraAltinn()
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
    };
    return (
        <>
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER &&
                organisasjonslisteFerdigLastet === Tilgang.IKKE_TILGANG && <IkkeTilgang/>}
            {organisasjonslisteFerdigLastet !== Tilgang.LASTER &&
                organisasjonslisteFerdigLastet === Tilgang.TILGANG && (
                    <OrganisasjonsListeContext.Provider value={defaultContext}>
                        {props.children}
                    </OrganisasjonsListeContext.Provider>
                )}
        </>
    );
};
export const OrganisasjonsListeProviderV2: FunctionComponent<PropsWithChildren> = (props) => {
    const {organisasjoner, isError} = useOrganisasjonerFraAltinn();

    if (organisasjoner === undefined || isError) {
        // TODO: trenger skisse / design på denne/disse statene
        return <>spinner og eller feilmelding</>;
    }

    return (
        <>
            {organisasjoner.length === 0
                ? <IkkeTilgang/>
                : <OrganisasjonsListeContext.Provider value={{organisasjoner}}>
                    {props.children}
                </OrganisasjonsListeContext.Provider>
            }
        </>
    );
};


type OrganisasjonerFraAltinnResult = {
    organisasjoner: OrganisasjonerReponse | undefined;
    isError: boolean;
    errorStatus: number | undefined;
};
export const useOrganisasjonerFraAltinn = (): OrganisasjonerFraAltinnResult => {
    const [retries, setRetries] = useState(0);
    const {data, error} = useSWR(
        '/permittering/api/organisasjoner',
        fetcher,
        {
            onSuccess: () => setRetries(0),
            onError: (error) => {
                if (retries === 5) {
                    console.error( // todo sentry
                        `hent organisasjoner fra altinn feilet med ${
                            error.status !== undefined ? `${error.status} ${error.statusText}` : error
                        }`
                    );
                }
                setRetries((x) => x + 1);
            },
            errorRetryInterval: 100,
        }
    );
    return {
        organisasjoner: data,
        isError: data === undefined && retries >= 5,
        errorStatus: error?.status,
    };
};

const OrganisasjonerReponse = z.array(Organisasjon);
type OrganisasjonerReponse = z.infer<typeof OrganisasjonerReponse>;

export async function fetcher(url: string): Promise<Organisasjon[]> {
    let respons = await fetch(url);
    if (!respons.ok) {
        throw respons;
    }
    return OrganisasjonerReponse.parse(await respons.json());
}