import { OpprettSkjema, Permitteringsskjema } from '../types/permitteringsskjema';
import api from './api-client';

export async function sjekkInnlogget(signal: any): Promise<boolean> {
    let respons = await fetch('/permittering/api/innlogget', { signal: signal });
    return respons.ok;
}

export const hent = async (id: string) => {
    const url = '/permittering/api/skjema/:id'.replace(':id', id);
    const response = await api.get(url);
    return response.data;
};

export const hentAlle = async () => {
    const response = await api.get('/permittering/api/skjema');
    return response.data;
};

export const opprett = async (data: OpprettSkjema) => {
    const response = await api.post('/permittering/api/skjema', data);
    return response.data;
};

export const lagre = async (skjema: Permitteringsskjema) => {
    const url = '/permittering/api/skjema/:id'.replace(':id', skjema.id);
    const response = await api.put(url, skjema);
    return response.data;
};

export const sendInn = async (id: Permitteringsskjema['id']) => {
    const skjemaSendInnUrl = '/permittering/api/skjema/:id/send-inn'.replace(':id', id);
    const response = await api.post(skjemaSendInnUrl);
    return response.data;
};

export const avbryt = async (id: Permitteringsskjema['id']) => {
    const skjemaAvbrytUrl = '/permittering/api/skjema/:id/avbryt'.replace(':id', id);
    const response = await api.post(skjemaAvbrytUrl);
    return response.data;
};
