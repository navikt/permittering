import { Organisasjon } from '../types/Organisasjon';
import { FetchError } from './api-utils';

export async function hentOrganisasjonerFraAltinn(signal: any): Promise<Organisasjon[]> {
    let respons = await fetch('/permittering/api/organisasjoner', { signal: signal });
    if (respons.ok) {
        return await respons.json();
    } else {
        throw new FetchError(respons.statusText || respons.type, respons);
    }
}
