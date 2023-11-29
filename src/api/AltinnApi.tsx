import {Organisasjon} from '../types/Organisasjon';

export async function hentOrganisasjonerFraAltinn(): Promise<Organisasjon[]> {
    let respons = await fetch('/permittering/api/organisasjoner');
    if (respons.ok) {
        return await respons.json();
    } else {
        throw respons;
    }
}
