// @ts-ignore
import validator from '@navikt/fnrvalidator';

export const getAgeFromFnr = (fnr: string) => {
    const day = fnr.substring(0, 2);
    const month = fnr.substring(2, 4);
    const year = fnr.substring(4, 6);
    // @ts-ignore
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const isFnrWoman = (fnr: string) => {
    return parseInt(fnr.charAt(8)) % 2 === 0;
};

export const getFnrReadableString = (fnr: string) => {
    const result = validator.idnr(fnr);
    if (result.status !== 'valid') {
        return 'Ugyldig fødselsnummer';
    }
    return (
        (isFnrWoman(fnr) ? 'Kvinne' : 'Mann') +
        ', ' +
        getAgeFromFnr(fnr) +
        ' år' +
        (result.type === 'dnr' ? ' (D)' : '')
    );
};
export const extractFnrFromString = (str: string) => {
    const output = [];
    const regex = /[+-]?\d+(?:\.\d+)?/g;
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(str))) {
        const result = validator.idnr(match[0]);
        if (result.status === 'valid') {
            output.push({
                fnr: match[0],
                type: result.type,
            });
        }
    }
    return output;
};
