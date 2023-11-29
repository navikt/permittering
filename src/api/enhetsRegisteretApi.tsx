import {OrganisasjonFraEnhetsregisteret, tomEnhetsregOrg} from '../types/organisasjonFraEnhetsRegisteret';

export async function hentUnderenhet(orgnr: string): Promise<OrganisasjonFraEnhetsregisteret> {
    let respons = await fetch(`https://data.brreg.no/enhetsregisteret/api/underenheter/${orgnr}`);
    if (respons.ok) {
        return await respons.json();
    }
    return tomEnhetsregOrg;
}

export async function hentOverordnetEnhet(orgnr: string): Promise<OrganisasjonFraEnhetsregisteret> {
    if (orgnr !== '') {
        let respons = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`);
        if (respons.ok) {
            return await respons.json();
        }
    }
    return tomEnhetsregOrg;
}
