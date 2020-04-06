import {
    refusjonAvbrytPath,
    refusjonListPath,
    refusjonPath,
    refusjonSendInnPath,
    arbeidsforholdLeggTilPath,
    arbeidsforholdSlettPath,
    arbeidsforholdHentPath,
} from '../paths.json';
import api from './api-client';
import { LeggTilArbeidsforhold, OpprettRefusjon, Refusjonsskjema } from '../types/refusjonsskjema';

export const hent = async (id: string) => {
    const url = refusjonPath.replace(':id', id);
    const response = await api.get(url);
    return response.data;
};

export const hentArbeidsforhold = async (id: string, sort: string, size: number, page: number) => {
    const url = arbeidsforholdHentPath
        .replace(':id', id)
        .replace(':sort', sort.toString())
        .replace(':size', size.toString())
        .replace(':page', page.toString());
    const response = await api.get(url);
    return response.data;
};

export const leggTilArbeidsforhold = async (data: LeggTilArbeidsforhold) => {
    const response = await api.post(arbeidsforholdLeggTilPath, data);
    return response.data;
};

export const slettArbeidsforhold = async (fnrs: string[]) => {
    const response = await api.post(arbeidsforholdSlettPath, fnrs);
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
