import { Permitteringsskjema } from '../types/Permitteringsskjema';
import useSWRMutation from 'swr/mutation';
import useSWR, { useSWRConfig } from 'swr';
import { useState } from 'react';
import { z } from 'zod';

export async function sjekkInnlogget(): Promise<boolean> {
    let respons = await fetch('/permittering/api/innlogget');
    return respons.ok;
}

export const useLagreSkjema = ({
    onSkjemaLagret,
}: {
    onSkjemaLagret: (skjema: Permitteringsskjema) => void;
}) => {
    const { trigger, data, error } = useSWRMutation('/permittering/api/skjemaV2', lagreSkjema, {
        onSuccess: onSkjemaLagret,
    });

    return {
        lagreSkjema: trigger,
        data,
        error,
    };
};

const lagreTrukket = async (baseUrl: string, { arg: id }: { arg: string }) => {
    const res = await fetch(`${baseUrl}/${id}/trekk`, { method: 'POST' });
    if (!res.ok) throw new Error((await res.text()) || 'Kunne ikke trekke skjema');
    return Permitteringsskjema.parse(await res.json());
};

export const useLagreTrukket = (onSkjemaLagret: (id: string) => void) => {
    const { mutate } = useSWRConfig();

    const { trigger, data, error, isMutating } = useSWRMutation(
        '/permittering/api/skjemaV2',
        lagreTrukket,
        {
            onSuccess: async (d) => {
                if (d.id) {
                    onSkjemaLagret(d.id);

                    await Promise.all([
                        mutate(`/permittering/api/skjemaV2/${d.id}`),
                        mutate('/permittering/api/skjemaV2'),
                    ]);
                }
            },
        }
    );

    return { lagreTrukket: (id: string) => trigger(id), data, error, isMutating };
};

const lagreSkjema = async (url: string, { arg: skjema }: { arg: Permitteringsskjema }) => {
    const response = await fetch(url, {
        body: JSON.stringify(skjema),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw response;
    }

    return Permitteringsskjema.parse(await response.json());
};

export const useHentSkjema = (id: string | undefined) => {
    const [retries, setRetries] = useState(0);
    const { data: skjema, error } = useSWR(
        id === undefined ? null : `/permittering/api/skjemaV2/${id}`,
        hent,
        {
            onSuccess: () => setRetries(0),
            onError: (error) => {
                if (retries === 5) {
                    console.error(
                        `hent skjema fra permitteringskjema-api feilet med ${
                            error.status !== undefined
                                ? `${error.status} ${error.statusText}`
                                : error
                        }`
                    );
                }
                setRetries((x) => x + 1);
            },
            errorRetryInterval: 300,
        }
    );

    return {
        skjema,
        error,
    };
};

const hent = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    if (!response.ok) {
        throw response;
    }
    return Permitteringsskjema.parse(await response.json());
};

export const useHentAlleSkjema = () => {
    const [retries, setRetries] = useState(0);
    const { data, error } = useSWR('/permittering/api/skjemaV2', hentAlle, {
        onSuccess: () => setRetries(0),
        onError: (error) => {
            if (retries === 5) {
                console.error(
                    `hent alle skjema fra permitteringskjema-api feilet med ${
                        error.status !== undefined ? `${error.status} ${error.statusText}` : error
                    }`
                );
            }
            setRetries((x) => x + 1);
        },
        errorRetryInterval: 300,
        fallbackData: [],
    });

    return {
        data,
        error,
    };
};

const PermitteringskjemaerRespons = z.array(Permitteringsskjema);
type PermitteringskjemaerRespons = z.infer<typeof PermitteringskjemaerRespons>;
const hentAlle = async (url: string): Promise<PermitteringskjemaerRespons> => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    if (!response.ok) {
        throw response;
    }
    return PermitteringskjemaerRespons.parse(await response.json());
};
