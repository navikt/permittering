import {Permitteringsskjema} from '../types/Permitteringsskjema';
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import {useState} from "react";
import {z} from "zod";

export async function sjekkInnlogget(): Promise<boolean> {
    let respons = await fetch('/permittering/api/innlogget');
    return respons.ok;
}

export const useLagreSkjema = () => {
    const {trigger, data, error} = useSWRMutation('/permittering/api/skjemaV2', lagreSkjema);

    return {
        lagreSkjema: trigger,
        data,
        error,
    }
}

const lagreSkjema = async (url : string, { arg: skjema } : { arg: Permitteringsskjema}) => {
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
    const {data: skjema, error} = useSWR(
        id === undefined ? null : `/permittering/api/skjema/${id}`,
        hent,
        {
            onSuccess: () => setRetries(0),
            onError: (error) => {
                if (retries === 5) {
                    console.error( // todo sentry
                        `hent skjema fra permitteringskjema-api feilet med ${
                            error.status !== undefined ? `${error.status} ${error.statusText}` : error
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
    }
}

const hent = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (!response.ok) {
        throw response;
    }
    return Permitteringsskjema.parse(await response.json());
};

export const useHentAlleSkjema = () => {
    const [retries, setRetries] = useState(0);
    const {data, error} = useSWR(
        '/permittering/api/skjema',
        hentAlle,
        {
            onSuccess: () => setRetries(0),
            onError: (error) => {
                if (retries === 5) {
                    console.error( // todo sentry
                        `hent alle skjema fra permitteringskjema-api feilet med ${
                            error.status !== undefined ? `${error.status} ${error.statusText}` : error
                        }`
                    );
                }
                setRetries((x) => x + 1);
            },
            errorRetryInterval: 300,
            fallbackData: [],
        }
    );

    return {
        data,
        error,
    }
}

const PermitteringskjemaerRespons = z.array(Permitteringsskjema);
type PermitteringskjemaerRespons = z.infer<typeof PermitteringskjemaerRespons>;
const hentAlle = async (url: string) : Promise<PermitteringskjemaerRespons> => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (!response.ok) {
        throw response;
    }
    return PermitteringskjemaerRespons.parse(await response.json());
};
