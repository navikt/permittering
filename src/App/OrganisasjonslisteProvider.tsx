import React, { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { Organisasjon } from '../types/Organisasjon';
import { IkkeTilgang } from './IkkeTilgang/IkkeTilgang';
import useSWR from 'swr';
import { z } from 'zod';
import { Side } from './Side';
import { Breadcrumbs } from './Skjema/Breadcrumbs';
import { BodyLong, BodyShort, Box, Heading, Link, List, Skeleton, VStack } from '@navikt/ds-react';
import { flatUtOrganisasjonstre } from '@navikt/bedriftsmeny';

export type OrganisajonsContext = {
    organisasjoner: Array<Organisasjon>;
    organisasjon: Organisasjon;
    setOrganisasjon: (organisasjon: Organisasjon) => void;
};

export const OrganisasjonsListeContext = React.createContext<OrganisajonsContext>(
    {} as OrganisajonsContext
);

export const OrganisasjonsListeProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const { organisasjoner, isError } = useOrganisasjonerV2FraAltinn();
    const [organisasjon, setOrganisasjon] = useState<Organisasjon | undefined>();

    useEffect(() => {
        if (organisasjoner !== undefined && organisasjon === undefined) {
            setOrganisasjon(organisasjoner[0]);
        }
    }, [organisasjoner, organisasjon, setOrganisasjon]);

    if (isError) {
        return <Feilside />;
    }

    if (organisasjoner === undefined) {
        return <Laster />;
    } else if (organisasjoner.length === 0) {
        return <IkkeTilgang />;
    } else if (organisasjon === undefined) {
        return <Laster />;
    } else {
        return (
            <OrganisasjonsListeContext.Provider
                value={{
                    organisasjoner,
                    organisasjon,
                    setOrganisasjon,
                }}
            >
                {props.children}
            </OrganisasjonsListeContext.Provider>
        );
    }
};

const Laster: FunctionComponent = () => {
    return (
        <Side tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid">
            <Breadcrumbs />
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{ xs: '4', sm: '4', md: '4', lg: '8' }}
            >
                <VStack gap="12">
                    <VStack gap="4">
                        <BodyLong as={Skeleton} size="medium">
                            Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller
                            flere ansatte? Da har du meldeplikt til NAV. Du kan også melde fra til
                            NAV hvis det gjelder under 10 ansatte, om ønskelig.
                        </BodyLong>

                        <Skeleton width="20vw" height="3rem" />
                    </VStack>

                    <VStack gap="4">
                        <Heading as={Skeleton} level="2" size="large">
                            Velg aktuelt skjema:
                        </Heading>

                        <Skeleton variant="rectangle" width="100%" height="8vh" />
                        <Skeleton variant="rectangle" width="100%" height="8vh" />
                        <Skeleton variant="rectangle" width="100%" height="8vh" />
                    </VStack>
                </VStack>
            </Box>
        </Side>
    );
};

const Feilside: FunctionComponent = () => {
    return (
        <Side tittel="Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid">
            <Breadcrumbs />
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{ xs: '4', sm: '4', md: '4', lg: '8' }}
            >
                <Heading level="1" size="large" spacing>
                    Henting av tilganger feilet
                </Heading>
                <BodyShort spacing>
                    En teknisk feil på våre servere gjør at siden er utilgjengelig. Dette skyldes
                    ikke noe du gjorde.
                </BodyShort>
                <BodyShort>Du kan prøve å</BodyShort>
                <List>
                    <List.Item>vente noen minutter og laste siden på nytt</List.Item>
                    <List.Item>gå tilbake til forrige side</List.Item>
                </List>
                <BodyShort>
                    Hvis problemet vedvarer, kan du{' '}
                    <Link href="https://nav.no/kontaktoss" target="_blank">
                        kontakte oss (åpnes i ny fane)
                    </Link>
                    .
                </BodyShort>
            </Box>
        </Side>
    );
};

type OrganisasjonerV2FraAltinnResult = {
    organisasjoner: Organisasjon[] | undefined;
    isError: boolean;
    errorStatus: number | undefined;
};
export const useOrganisasjonerV2FraAltinn = (): OrganisasjonerV2FraAltinnResult => {
    const [retries, setRetries] = useState(0);
    const { data, error } = useSWR('/permittering/api/organisasjoner-v2', fetcherV2, {
        onSuccess: () => setRetries(0),
        onError: (error) => {
            if (retries === 5) {
                console.error(
                    `hent organisasjoner-v2 fra altinn feilet med ${
                        error.status !== undefined ? `${error.status} ${error.statusText}` : error
                    }`
                );
            }
            setRetries((x) => x + 1);
        },
        errorRetryInterval: 100,
    });
    return {
        organisasjoner: data === undefined ? undefined : flatUtOrganisasjonstre(data),
        isError: data === undefined && retries >= 5,
        errorStatus: error?.status,
    };
};

// recursive type using zod https://zodjs.netlify.app/guide/recursive-types#recursive-types
const BaseAltinnTilgang = z.object({
    orgNr: z.string(),
    name: z.string(),
    organizationForm: z.string(),
});
type AltinnTilgang = z.infer<typeof BaseAltinnTilgang> & {
    underenheter: AltinnTilgang[];
};
const AltinnTilgang: z.ZodType<AltinnTilgang> = BaseAltinnTilgang.extend({
    underenheter: z.lazy(() => AltinnTilgang.array()),
});
const AltinnTilgangerResponse = z.array(AltinnTilgang);
export async function fetcherV2(url: string): Promise<AltinnTilgang[]> {
    let respons = await fetch(url);
    if (!respons.ok) {
        throw respons;
    }
    return AltinnTilgangerResponse.parse(await respons.json());
}