export type Permitteringsskjema = {
    id: string;
    opprettetTidspunkt: string;
    bedriftNr: string;
    bedriftNavn: string;
    type: 'MASSEOPPSIGELSE' | 'PERMITTERING_UTEN_LØNN' | 'INNSKRENKNING_I_ARBEIDSTID';
    kontaktNavn?: string;
    kontaktTlf?: string;
    kontaktEpost?: string;
    varsletAnsattDato?: string;
    varsletNavDato?: string;
    startDato?: string;
    sluttDato?: string;
    ukjentSluttDato?: boolean;
    fritekst?: string;
    personer: Person[];
    antallBerørt: number;
    sendtInnTidspunkt?: string;
};

export type Person = {
    fnr: string;
    grad?: number;
    selected?: boolean;
    kommentar: string;
};

export type OpprettSkjema = Pick<Permitteringsskjema, 'bedriftNr' | 'type'>;

export type PermitteringsskjemaITabell = Pick<
    Permitteringsskjema,
    'id' | 'bedriftNr' | 'bedriftNavn' | 'antallBerørt' | 'sendtInnTidspunkt'
>;
