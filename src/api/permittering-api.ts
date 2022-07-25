import { OpprettSkjema, Permitteringsskjema } from '../types/permitteringsskjema';
import * as paths from '../paths';
import api from './api-client';

export async function sjekkInnlogget(signal: any): Promise<boolean> {
    let respons = await fetch(paths.sjekkInnloggetPath, { signal: signal });
    if (respons.ok) {
        return true;
    } else {
        return false;
    }
}

export const hent = async (id: string) => {
    const url = paths.skjemaPath.replace(':id', id);
    const response = await api.get(url);
    return response.data;
};

export const hentAlle = async () => {
    const response = await api.get(paths.skjemaListPath);
    return response.data;
};

export const opprett = async (data: OpprettSkjema) => {
    const response = await api.post(paths.skjemaListPath, data);
    return response.data;
};

export const lagre = async (skjema: Permitteringsskjema) => {
    const url = paths.skjemaPath.replace(':id', skjema.id);
    const response = await api.put(url, skjema);
    return response.data;
};

export const sendInn = async (id: Permitteringsskjema['id']) => {
    const skjemaSendInnUrl = paths.skjemaSendInnPath.replace(':id', id);
    const response = await api.post(skjemaSendInnUrl);
    return response.data;
};

export const avbryt = async (id: Permitteringsskjema['id']) => {
    const skjemaAvbrytUrl = paths.skjemaAvbrytPath.replace(':id', id);
    const response = await api.post(skjemaAvbrytUrl);
    return response.data;
};
