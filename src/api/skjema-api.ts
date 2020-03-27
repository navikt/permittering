import { OpprettSkjema, Permitteringsskjema } from '../types/permitteringsskjema';
import axios from 'axios';
import { skjemaListPath, skjemaPath, skjemaSendInnPath, skjemaAvbrytPath } from '../paths.json';

const api = axios.create({
    baseURL: '',
    withCredentials: true,
    timeout: 30000,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // redirectToLogin();
        } else if (error.response.status === 403) {
            // redirectToIngenTilgang();
        } else {
            return Promise.reject(error);
        }
    }
);

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
