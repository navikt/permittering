import amplitude from '../utils/amplitude';
import { Organisasjon } from '../types/Organisasjon';
import {
    OrganisasjonFraEnhetsregisteret,
    tomEnhetsregOrg,
} from '../types/organisasjonFraEnhetsRegisteret';
import { hentOverordnetEnhet, hentUnderenhet } from '../api/enhetsRegisteretApi';

export const brukerLoggetPa = () => {
    amplitude.logEvent('#permitteringOgOppsigelse bruker logget på');
};

export const loggBedriftsInfo = async (organisasjon: Organisasjon) => {
    let infoFraEereg: OrganisasjonFraEnhetsregisteret = tomEnhetsregOrg;
    await hentUnderenhet(organisasjon.OrganizationNumber).then(underenhet => {
        infoFraEereg = underenhet;
    });

    if (infoFraEereg !== tomEnhetsregOrg) {
        let infoFraEeregJuridisk: OrganisasjonFraEnhetsregisteret = tomEnhetsregOrg;
        await hentOverordnetEnhet(organisasjon.ParentOrganizationNumber).then(enhet => {
            infoFraEeregJuridisk = enhet;
        });
        if (infoFraEereg.naeringskode1.kode.startsWith('84')) {
            amplitude.logEvent('#permitteringOgOppsigelse OFFENTLIG');
            if (infoFraEereg.institusjonellSektorkode.kode === '6500') {
                amplitude.logEvent('#permitteringOgOppsigelse  Kommuneforvaltningen');
            }
            if (infoFraEereg.institusjonellSektorkode.kode === '6100') {
                amplitude.logEvent('#permitteringOgOppsigelse  Statsforvaltningen');
            }

            amplitude.logEvent(
                '#permitteringOgOppsigelse  kode er: ',
                infoFraEereg.institusjonellSektorkode.kode
            );
        } else {
            amplitude.logEvent('#permitteringOgOppsigelse  PRIVAT');
        }
        const antallAnsatte = Number(infoFraEereg.antallAnsatte);
        const antallAnsatteJuridiske = Number(infoFraEeregJuridisk.antallAnsatte);
        switch (true) {
            case antallAnsatte < 20:
                amplitude.logEvent('#permitteringOgOppsigelse under 20 ansatte');
                break;
            case antallAnsatte > 3000:
                amplitude.logEvent('#permitteringOgOppsigelse over 3000 ansatte');
                break;
            case antallAnsatte > 1000:
                amplitude.logEvent('#permitteringOgOppsigelse over 1000 ansatte');
                break;
            case antallAnsatte > 500:
                amplitude.logEvent('#permitteringOgOppsigelse over 500 ansatte');
                break;
            case antallAnsatte > 100:
                amplitude.logEvent('#permitteringOgOppsigelse over 100 ansatte');
                break;
            case antallAnsatte > 20:
                amplitude.logEvent('#permitteringOgOppsigelse over 20 ansatte');
                break;
            default:
                break;
        }
        switch (true) {
            case antallAnsatteJuridiske < 20:
                amplitude.logEvent('#permitteringOgOppsigelse under 20 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 10000:
                amplitude.logEvent('#permitteringOgOppsigelse over 10000 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 8000:
                amplitude.logEvent('#permitteringOgOppsigelse over 8000 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 5000:
                amplitude.logEvent('#permitteringOgOppsigelse over 5000 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 3000:
                amplitude.logEvent('#permitteringOgOppsigelse over 3000 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 1000:
                amplitude.logEvent('#permitteringOgOppsigelse over 1000 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 500:
                amplitude.logEvent('#permitteringOgOppsigelse over 500 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 100:
                amplitude.logEvent('#permitteringOgOppsigelse over 100 ansatte i juridisk enhet');
                break;
            case antallAnsatteJuridiske > 20:
                amplitude.logEvent('#permitteringOgOppsigelse over 20 ansatte i juridisk enhet');
                break;
            default:
                break;
        }
    }
};
