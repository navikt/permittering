export const erGyldigTelefonNr = (nr: string) => {
    const bestarAvSiffer = nr.match(/^[0-9]+$/);
    const erStandard = nr.match(/^[0-9]+$/) != null && nr.length === 8;
    const begynnerMed0047 = nr.substring(0, 4) === '0047' && bestarAvSiffer && nr.length === 12;
    const begynnerMedPluss =
        nr.substr(0, 3) === '+47' &&
        nr.length === 11 &&
        nr.substring(3, 11).match(/^[0-9]+$/) != null;
    return erStandard || begynnerMed0047 || begynnerMedPluss;
};

export const erGyldigEpost = (epost: string) => {
   
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    isValidEmail = regexp.test(epost);
    
    return isValidEmail;
};
