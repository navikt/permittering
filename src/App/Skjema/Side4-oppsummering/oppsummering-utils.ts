export const lagTekstBasertPaSkjemaType = (type: string) => {
    switch (true) {
        case type === 'MASSEOPPSIGELSE':
            return 'Hvorfor skal dere si opp ansatte?';
        case type === 'PERMITTERING_UTEN_LØNN':
            return 'Hvorfor skal dere permittere?';
        case type === 'INNSKRENKNING_I_ARBEIDSTID':
            return 'Hvorfor skal dere innskrenke arbeidstiden til ansatte?';
    }
    return 'Hvorfor skal dere permittere?';
};

export const lagTekstVarighet = (type: string, fraEllerTil: string) => {
    switch (true) {
        case type === 'MASSEOPPSIGELSE':
            return `Oppsigelsene ${fraEllerTil}`;
        case type === 'PERMITTERING_UTEN_LØNN':
            return `Permitteringene ${fraEllerTil}`;
        case type === 'INNSKRENKNING_I_ARBEIDSTID':
            return `Innskrenkningen i arbeidstid ${fraEllerTil}`;
    }
    return `Permitteringene ${fraEllerTil}`;
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
