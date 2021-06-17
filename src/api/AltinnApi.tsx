import { hentOrganisasjonerPath, hentRefusjonOrganisasjonerPath } from '../paths.json';
import { Organisasjon } from '../types/Organisasjon';
import { FetchError } from './api-utils';

export async function hentOrganisasjonerFraAltinn(signal: any): Promise<Organisasjon[]> {
    let respons = await fetch(hentOrganisasjonerPath, { signal: signal });
    if (respons.ok) {
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}

export async function hentRefusjonOrganisasjonerFraAltinn(signal: any): Promise<Organisasjon[]> {
    let respons = await fetch(hentRefusjonOrganisasjonerPath, { signal: signal });
    if (respons.ok) {
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}
