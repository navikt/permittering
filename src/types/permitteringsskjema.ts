export type Permitteringsskjema = {
  id: string;
  opprettetTidspunkt: string;
  orgNr: string;
  type: string;
  kontaktNavn?: string;
  kontaktTlf?: string;
  varsletAnsattDato?: string;
  varsletNavDato?: string;
  startDato?: string;
  sluttDato?: string;
  ukjentSluttDato?: string;
  fritekst?: string;
  personer: Personer[];
};

export type Personer = {
  fnr: string;
  grad?: number;
  kommentar: string;
};
