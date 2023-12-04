import {OrganisasjonFraEnhetsRegisteret, tomEnhetsregOrg} from '../types/OrganisasjonFraEnhetsRegisteret';

export async function hentUnderenhet(orgnr: string): Promise<OrganisasjonFraEnhetsRegisteret> {
    let respons = await fetch(`https://data.brreg.no/enhetsregisteret/api/underenheter/${orgnr}`);
    if (respons.ok) {
        return await respons.json();
    }
    return tomEnhetsregOrg;
}

export async function hentOverordnetEnhet(orgnr: string): Promise<OrganisasjonFraEnhetsRegisteret> {
    if (orgnr !== '') {
        let respons = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`);
        if (respons.ok) {
            return await respons.json();
        }
    }
    return tomEnhetsregOrg;
}
