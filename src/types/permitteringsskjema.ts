export type Permitteringsskjema = {
    id: string;
    opprettetTidspunkt: string;
    bedriftNr?: string;
    bedriftNavn?: string;
    type: 'MASSEOPPSIGELSE' | 'PERMITTERING_UTEN_LØNN' | 'INNSKRENKNING_I_ARBEIDSTID';
    kontaktNavn: string;
    kontaktTlf?: string;
    kontaktEpost?: string;
    varsletAnsattDato?: string;
    varsletNavDato?: string;
    startDato?: string;
    sluttDato?: string;
    ukjentSluttDato?: boolean;
    fritekst?: string;
    personer: Person[];
    antallBerørt?: number;
    bedrifter?: Bedrift[];
    sendtInnTidspunkt?: string;
    avbrutt: boolean;
    årsakskode?: string;
    årsakstekst?: string;
    yrkeskategorier: Yrkeskategori[];
};

export type Person = {
    fnr: string;
    grad?: number;
    selected?: boolean;
    kommentar: string;
};

export type Yrkeskategori = {
    konseptId: number;
    styrk08: string;
    label: string;
};
export type Bedrift = {
    antall: number;
    navn: string;
    bedriftsnr: string;
};

export type OpprettSkjema = Pick<Permitteringsskjema, 'bedriftNr' | 'type'>;
