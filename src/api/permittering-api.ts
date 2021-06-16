import { OpprettSkjema, Permitteringsskjema } from '../types/permitteringsskjema';
import {
    sjekkInnloggetLink,
    skjemaAvbrytPath,
    skjemaListPath,
    skjemaPath,
    skjemaSendInnPath,
} from '../paths.json';
import api from './api-client';

export async function sjekkInnlogget(signal: any): Promise<boolean> {
    let respons = await fetch(sjekkInnloggetLink, { signal: signal });
    if (respons.ok) {
        return true;
    } else {
        return false;
    }
}

export const hent = async (id: string) => {
    const url = skjemaPath.replace(':id', id);
    const response = await api.get(url);
    return response.data;
};

export const hentAlle = async () => {
    const response = await api.get(skjemaListPath);
    return response.data;
};

export const opprett = async (data: OpprettSkjema) => {
    const response = await api.post(skjemaListPath, data);
    return response.data;
};

export const lagre = async (skjema: Permitteringsskjema) => {
    const url = skjemaPath.replace(':id', skjema.id);
    const response = await api.put(url, skjema);
    return response.data;
};

export const sendInn = async (id: Permitteringsskjema['id']) => {
    const skjemaSendInnUrl = skjemaSendInnPath.replace(':id', id);
    const response = await api.post(skjemaSendInnUrl);
    return response.data;
};

export const avbryt = async (id: Permitteringsskjema['id']) => {
    const skjemaAvbrytUrl = skjemaAvbrytPath.replace(':id', id);
    const response = await api.post(skjemaAvbrytUrl);
    return response.data;
};
