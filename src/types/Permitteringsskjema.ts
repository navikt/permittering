import {z} from "zod";

export type Årsakskode = keyof typeof Årsakskoder;
export const Årsakskoder = {
    MANGEL_PÅ_ARBEID : "Mangel på arbeid eller oppdrag",
    RÅSTOFFMANGEL : "Råstoffmangel",
    ARBEIDSKONFLIKT_ELLER_STREIK : "Arbeidskonflikt eller streik",
    BRANN : "Brann",
    PÅLEGG_FRA_OFFENTLIG_MYNDIGHET : "Pålegg fra offentlig myndighet",
    ANDRE_ÅRSAKER : "Andre årsaker"
}
export const ÅrsakskodeKeys = Object.keys(Årsakskoder) as Årsakskode[];

export const Yrkeskategori = z.object({
    konseptId: z.number(),
    styrk08: z.string(),
    label: z.string(),
});
export type Yrkeskategori = z.infer<typeof Yrkeskategori>;

export const SkjemaType = z.enum(['MASSEOPPSIGELSE', 'PERMITTERING_UTEN_LØNN', 'INNSKRENKNING_I_ARBEIDSTID']);
export const Permitteringsskjema = z.object({
    id: z.string().optional(),
    type: SkjemaType,

    bedriftNr: z.string(),
    bedriftNavn: z.string(),

    kontaktNavn: z.string(),
    kontaktEpost: z.string(),
    kontaktTlf: z.string(),

    antallBerørt: z.number(),

    årsakskode: z.enum([ÅrsakskodeKeys[0], ...ÅrsakskodeKeys]),
    årsakstekst: z.string(),
    yrkeskategorier: z.array(Yrkeskategori),

    startDato: z.date(),
    sluttDato: z.date().optional(),
    ukjentSluttDato: z.boolean().default(false),

    fritekst: z.string(),
    sendtInnTidspunkt: z.string().optional().nullish(),
});
export type Permitteringsskjema = z.infer<typeof Permitteringsskjema>;
export type SkjemaType = z.infer<typeof SkjemaType>;
