import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import {Organisasjon} from '../types/Organisasjon';
import {IkkeTilgang} from './IkkeTilgang/IkkeTilgang';
import useSWR from "swr";
import {z} from "zod";
import * as Sentry from "@sentry/browser";
import {Side} from "./Side";
import {Breadcrumbs} from "./Skjema/Breadcrumbs";
import {Alert, Box, Heading, Skeleton, VStack} from "@navikt/ds-react";

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


    if (isError) {
        return <AltinnFeil />;
    }

    if (organisasjoner === undefined || organisasjon === undefined) {
        return <Laster />;
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

const Laster: FunctionComponent = () => {
    return (
        <Side
            tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"
        >
            <Breadcrumbs/>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <VStack gap="12">
                    <Skeleton variant="rectangle" width="100%" height={30} />
                    <Skeleton variant="rectangle" width="100%" height={30} />
                </VStack>
            </Box>
        </Side>
    );
};

const AltinnFeil: FunctionComponent = () => {
    return (
        <Side
            tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"
        >
            <Breadcrumbs/>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <VStack gap="12">
                    <Heading level="2" size="small">
                        Henting av tilganger feilet
                    </Heading>
                    <Alert variant="error">
                        Det oppstod en feil ved henting av tilganger. Prøv igjen om noen minutter.
                    </Alert>
                </VStack>
            </Box>
        </Side>
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
                    Sentry.captureMessage(
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