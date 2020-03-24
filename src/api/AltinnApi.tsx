import { Organisasjon } from '../types/Organisasjon';
import { FetchError } from './api-utils';
import { hentOrganisasjonerLink } from '../paths.json';

export async function hentOrganisasjonerFraAltinn(signal: any): Promise<Organisasjon[]> {
    let respons = await fetch(hentOrganisasjonerLink, { signal: signal });
    if (respons.ok) {
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}
