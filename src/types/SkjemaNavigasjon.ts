export interface SkjemaSteg {
    aktiv: boolean;
    number: number;
    label: string;
    slug: string;
    path: string;
}

export type SkjemaNavigasjon = {
    steg: SkjemaSteg[];
    forrigeSide: string;
    nesteSide: string;
};
