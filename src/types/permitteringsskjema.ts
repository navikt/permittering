export type Permitteringsskjema = {
  id: string;
  opprettetTidspunkt: string;
  orgNr: string;
  type:
    | "MASSEOPPSIGELSE"
    | "PERMITTERING_UTEN_LØNN"
    | "INNSKRENKNING_I_ARBEIDSTID";
  kontaktNavn?: string;
  kontaktTlf?: string;
  varsletAnsattDato?: string;
  varsletNavDato?: string;
  startDato?: string;
  sluttDato?: string;
  ukjentSluttDato?: string;
  fritekst?: string;
  personer: Person[];
};

export type Person = {
  fnr: string;
  grad?: number;
  selected?: boolean;
  kommentar: string;
};
