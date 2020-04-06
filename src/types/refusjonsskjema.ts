export type Refusjonsskjema = {
    id: string;
    opprettetTidspunkt: string;
    bedriftNr: string;
    bedriftNavn: string;
    type: 'REFUSJONSKRAV_CORONOA';
    kontaktNavn: string;
    kontaktTlf?: string;
    kontaktEpost?: string;
    fritekst?: string;
    arbeidsforhold: Arbeidsforhold[];
    sendtInnTidspunkt?: string;
    avbrutt: boolean;
};

export type Arbeidsforhold = {
    fnr: string;
    gradering?: number;
    periodeSlutt: string;
    periodeStart: string;
    inntektInnhentet: number;
    refusjonsbeløp: number;
    beregningsdetaljer: ('SEKS_G' | 'FEILET')[];
};

export type LeggTilArbeidsforhold = {
    refusjonsskjemaId: string;
    fnr: string[];
    gradering: number;
    periodeStart: string;
    periodeSlutt: string;
};

export type OpprettRefusjon = Pick<Refusjonsskjema, 'bedriftNr' | 'type'>;
