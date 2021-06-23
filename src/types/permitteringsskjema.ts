export type Permitteringsskjema = {
    id: string;
    opprettetTidspunkt: string;
    bedriftNr: string;
    bedriftNavn: string;
    type: 'MASSEOPPSIGELSE' | 'PERMITTERING_UTEN_LØNN' | 'INNSKRENKNING_I_ARBEIDSTID';
    kontaktNavn: string;
    kontaktTlf?: string;
    kontaktEpost?: string;
    varsletAnsattDato?: string;
    varsletNavDato?: string;
    startDato?: string | undefined;
    sluttDato?: string | undefined;
    ukjentSluttDato?: boolean;
    fritekst?: string;
    personer: Person[];
    antallBerørt?: number;
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

export type OpprettSkjema = Pick<Permitteringsskjema, 'bedriftNr' | 'type'>;
