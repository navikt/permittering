export const lagTekstBasertPaSkjemaType = (type: string) => {
    switch (true) {
        case type === 'MASSEOPPSIGELSE':
            return 'Hva er årsaken til masseoppsigelsen?';
        case type === 'PERMITTERING_UTEN_LØNN':
            return 'Hva er årsaken til permitteringen?';
        case type === 'INNSKRENKNING_I_ARBEIDSTID':
            return 'Hva er årsaken til innskrenkningen';
    }
    return '';
};

const finnMaaned = (month: number): string => {
    switch (month) {
        case 0:
            return 'januar';
        case 1:
            return 'februar';
        case 2:
            return 'mars';
        case 3:
            return 'april';
        case 4:
            return 'mai';
        case 5:
            return 'juni';
        case 6:
            return 'juli';
        case 7:
            return 'august';
        case 8:
            return 'september';
        case 9:
            return 'oktober';
        case 10:
            return 'november';
        case 11:
            return 'desember';
    }
    return (month + 1).toString();
};

export const formatterDato = (dato: Date) => {
    return dato.getDate() + '. ' + finnMaaned(dato.getMonth()) + ' ' + dato.getFullYear();
};
