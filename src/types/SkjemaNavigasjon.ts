export interface SkjemaSteg {
    aktiv: boolean;
    index: number;
    label: string;
    slug: string;
    path: string;
}

export type SkjemaNavigasjon = {
    steg: SkjemaSteg[];
    forrigeSide: string;
    nesteSide: string;
};
