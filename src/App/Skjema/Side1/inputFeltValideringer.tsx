export const erGyldigTelefonNr = (nr: string) => {
    const bestarKunAvSiffer = nr.match(/^[0-9]+$/) != null;
    const erAtteSiffer = nr.length === 8;
    return erAtteSiffer && bestarKunAvSiffer;
};

export const erGyldigEpost = (epost: string) => {
    const inneholderAt = epost.includes('@');
    const inneholderPunktum = epost.includes('');
    return inneholderAt && inneholderPunktum;
};

export const genererFeilMeldingForNr = (nr: string) => {
    const bestarKunAvSiffer = nr.match(/^[0-9]+$/) != null;
    if ((nr.length === 12 && bestarKunAvSiffer) || (nr[0] === '+' && nr.length === 11)) {
        return 'Nummeret skal bestå av åtte siffer';
    }
    return 'Vennligst oppgi et gyldig telefonnummer';
};
