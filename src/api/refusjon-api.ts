import {
    refusjonAvbrytPath,
    refusjonListPath,
    refusjonPath,
    refusjonsberegningPath,
    refusjonSendInnPath,
} from '../paths.json';
import api from './api-client';
import { OpprettRefusjon, Refusjonsskjema } from '../types/refusjonsskjema';

export const hent = async (id: string) => {
    const url = refusjonPath.replace(':id', id);
    const response = await api.get(url);
    return response.data;
};

export const hentBeregninger = async (id: string) => {
    const url = refusjonsberegningPath.replace(':id', id);
    const response = await api.get(url);
    return response.data;
};

export const hentAlle = async () => {
    const response = await api.get(refusjonListPath);
    return response.data;
};

export const opprett = async (data: OpprettRefusjon) => {
    const response = await api.post(refusjonListPath, data);
    return response.data;
};

export const lagre = async (skjema: Refusjonsskjema) => {
    const url = refusjonPath.replace(':id', skjema.id);
    const response = await api.put(url, skjema);
    return response.data;
};

export const sendInn = async (id: Refusjonsskjema['id']) => {
    const skjemaSendInnUrl = refusjonSendInnPath.replace(':id', id);
    const response = await api.post(skjemaSendInnUrl);
    return response.data;
};

export const avbryt = async (id: Refusjonsskjema['id']) => {
    const skjemaAvbrytUrl = refusjonAvbrytPath.replace(':id', id);
    const response = await api.post(skjemaAvbrytUrl);
    return response.data;
};
