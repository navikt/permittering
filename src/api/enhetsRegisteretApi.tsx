import {
    OrganisasjonFraEnhetsregisteret,
    tomEnhetsregOrg,
} from '../types/organisasjonFraEnhetsRegisteret';
import { hentOverordnetEnhetApiLink, hentUnderenhetApiLink } from '../utils/lenker';

export async function hentUnderenhet(orgnr: string): Promise<OrganisasjonFraEnhetsregisteret> {
    let respons = await fetch(hentUnderenhetApiLink(orgnr));
    if (respons.ok) {
        const enhet: OrganisasjonFraEnhetsregisteret = await respons.json();
        return enhet;
    }
    return tomEnhetsregOrg;
}

export async function hentOverordnetEnhet(orgnr: string): Promise<OrganisasjonFraEnhetsregisteret> {
    if (orgnr !== '') {
        let respons = await fetch(hentOverordnetEnhetApiLink(orgnr));
        if (respons.ok) {
            const enhet: OrganisasjonFraEnhetsregisteret = await respons.json();
            return enhet;
        }
    }
    return tomEnhetsregOrg;
}
