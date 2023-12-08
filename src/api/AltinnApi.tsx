import {Organisasjon} from '../types/Organisasjon';
import {z} from "zod";

const OrganisasjonerReponse = z.array(Organisasjon)
export async function hentOrganisasjonerFraAltinn(): Promise<Organisasjon[]> {
    let respons = await fetch('/permittering/api/organisasjoner');
    if (!respons.ok) {
        throw respons;
    }
    return OrganisasjonerReponse.parse(await respons.json());
}


