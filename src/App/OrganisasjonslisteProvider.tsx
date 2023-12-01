import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import {Organisasjon} from '../types/Organisasjon';
import {hentOrganisasjonerFraAltinn} from '../api/AltinnApi';
import IkkeTilgang from './IkkeTilgang/IkkeTilgang';
import useSWR from "swr";
import {z} from "zod";

export type OrganisajonsContext = {
    organisasjoner: Array<Organisasjon>;
    organisasjon: Organisasjon;
    setOrganisasjon: (organisasjon: Organisasjon) => void;
};

export const OrganisasjonsListeContext = React.createContext<OrganisajonsContext>(
    {} as OrganisajonsContext
);

export const OrganisasjonsListeProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const {organisasjoner, isError} = useOrganisasjonerFraAltinn();
    const [organisasjon, setOrganisasjon] = useState<Organisasjon | undefined>();

    useEffect(() => {
        if (organisasjoner !== undefined && organisasjon === undefined) {
            setOrganisasjon(organisasjoner[0]);
        }
    }, [organisasjoner, organisasjon, setOrganisasjon]);

    if (organisasjoner === undefined || organisasjon === undefined) {
        // TODO: trenger skisse / design på denne staten
        return <>spinner</>;
    }

    if (isError) {
        // TODO: trenger skisse / design på denne staten
        return <>vis feilmelding</>;
    }

    return (
        <>
            {organisasjoner.length === 0
                ? <IkkeTilgang/>
                : <OrganisasjonsListeContext.Provider value={{
                    organisasjoner,
                    organisasjon,
                    setOrganisasjon,
                }}>
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