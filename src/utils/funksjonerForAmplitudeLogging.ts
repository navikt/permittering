import amplitude from '../utils/amplitude';
import { Organisasjon } from '../types/Organisasjon';
import {
    OrganisasjonFraEnhetsregisteret,
    tomEnhetsregOrg,
} from '../types/organisasjonFraEnhetsRegisteret';
import { hentOverordnetEnhet, hentUnderenhet } from '../api/enhetsRegisteretApi';

export const brukerLoggetPa = () => {
    amplitude.logEvent('#permitteringsskjema-forside bruker logget på');
};

export const loggSkjemaValg = (type: string) => {
    let skalLogges = '#permitteringsskjema-hvaSkalDuRapportere ';
    switch (true) {
        case type === 'MASSEOPPSIGELSE':
            skalLogges += 'masseoppsigelse';
            break;
        case type === 'PERMITTERING_UTEN_LØNN':
            skalLogges += 'permittering';
            break;
        case type === 'INNSKRENKNING_I_ARBEIDSTID':
            skalLogges += 'innskrenkning';
            break;
    }
    amplitude.logEvent(skalLogges);
};

export const loggNavarendeSteg = (steg: string) => {
    amplitude.logEvent('#permitteringsskjema-' + steg);
};

export const loggSkjemaInnsendt = () => {
    amplitude.logEvent('#permitteringsskjema-oppsumeringsside send-inn-trykket-på');
};

export const loggBedriftsInfo = async (organisasjon: Organisasjon): Promise<string> => {
    let infoFraEereg: OrganisasjonFraEnhetsregisteret = tomEnhetsregOrg;
    await hentUnderenhet(organisasjon.OrganizationNumber).then(underenhet => {
        infoFraEereg = underenhet;
    });

    const antallAnsatte = infoFraEereg.antallAnsatte;

    if (infoFraEereg !== tomEnhetsregOrg) {
        let infoFraEeregJuridisk: OrganisasjonFraEnhetsregisteret = tomEnhetsregOrg;
        await hentOverordnetEnhet(organisasjon.ParentOrganizationNumber).then(enhet => {
            infoFraEeregJuridisk = enhet;
        });
        if (infoFraEereg.naeringskode1 && infoFraEereg.naeringskode1.kode.startsWith('84')) {
            amplitude.logEvent('#permitteringsskjema-forside OFFENTLIG');
            if (
                infoFraEereg.institusjonellSektorkode.kode &&
                infoFraEereg.institusjonellSektorkode.kode === '6500'
            ) {
                amplitude.logEvent('#permitteringsskjema-forside  Kommuneforvaltningen');
            }
            if (
                infoFraEereg.institusjonellSektorkode.kode &&
                infoFraEereg.institusjonellSektorkode.kode === '6100'
            ) {
                amplitude.logEvent('#permitteringsskjema-forside  Statsforvaltningen');
            }
        } else {
            amplitude.logEvent('#permitteringsskjema-forside  PRIVAT');
        }
        const antallAnsatte = Number(infoFraEereg.antallAnsatte);
        const antallAnsatteJuridiske = Number(infoFraEeregJuridisk.antallAnsatte);
        switch (true) {
            case antallAnsatte < 20:
                amplitude.logEvent('#permitteringsskjema-forside under 20 ansatte');
                break;
            case antallAnsatte > 3000:
                amplitude.logEvent('#permitteringsskjema-forside over 3000 ansatte');
                break;
            case antallAnsatte > 1000:
                amplitude.logEvent('#permitteringsskjema-forside over 1000 ansatte');
                break;
            case antallAnsatte > 500:
                amplitude.logEvent('#permitteringsskjema-forside over 500 ansatte');
                break;
            case antallAnsatte > 100:
                amplitude.logEvent('#permitteringsskjema-forside over 100 ansatte');
                break;
            case antallAnsatte >= 20:
                amplitude.logEvent('#permitteringsskjema-forside over 20 ansatte');
                break;
            default:
                break;
        }
        switch (true) {
            case antallAnsatteJuridiske < 20:
                amplitude.logEvent(
                    '#permitteringsskjema-forside under 20 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 10000:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 10000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 8000:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 8000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 5000:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 5000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 3000:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 3000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 1000:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 1000 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 500:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 500 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske > 100:
                amplitude.logEvent(
                    '#permitteringsskjema-forside over 100 ansatte i juridisk enhet'
                );
                break;
            case antallAnsatteJuridiske >= 20:
                amplitude.logEvent('#permitteringsskjema-forside over 20 ansatte i juridisk enhet');
                break;
            default:
                break;
        }
    }
    return antallAnsatte;
};

export const loggAntallUnderenheter = (antall: number) => {
    let skalLogges = '#permitteringsskjema antall underenheter: ';

    switch (true) {
        case antall === 1:
            skalLogges += '1';
            break;
        case antall <= 5:
            skalLogges += ' 2-5';
            break;
        case antall <= 10:
            skalLogges += '6-10';
            break;
        case antall <= 15:
            skalLogges += '11-15';
            break;
        case antall <= 25:
            skalLogges += '16-25';
            break;
        case antall > 25:
            skalLogges += 'over 25';
            break;
    }
    amplitude.logEvent(skalLogges);
};

export const loggProsentAndelPermittert = (
    skjematype: string,
    antallAnsatte: number,
    antallBerorte: number
) => {
    const prosentAndel = antallBerorte / antallAnsatte;
    let skalLogges = '#permitteringsskjema ' + skjematype;
    switch (true) {
        case prosentAndel <= 10:
            skalLogges += ' 0-10%';
            break;
        case prosentAndel <= 20:
            skalLogges += ' 10-20%';
            break;
        case prosentAndel <= 30:
            skalLogges += '20-30%';
            break;
        case prosentAndel <= 40:
            skalLogges += '30-40%';
            break;
        case prosentAndel <= 50:
            skalLogges += '40-50%';
            break;
        case prosentAndel <= 60:
            skalLogges += '50-60%';
            break;
        case prosentAndel <= 70:
            skalLogges += '60-70%';
            break;
        case prosentAndel <= 80:
            skalLogges += '70-80%';
            break;
        case prosentAndel <= 90:
            skalLogges += '80-90%';
            break;
        case prosentAndel <= 100:
            skalLogges += 'over 90%';
            break;
    }
    amplitude.logEvent(skalLogges);
};
