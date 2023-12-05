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

    kontaktNavn: z.string({
        required_error: "Navn på kontakperson må fylles ut",
    }),
    kontaktEpost: z.string({
        required_error: "E-post til kontakperson må fylles ut",
    }).email({
        message: "E-post til kontaktperson er ikke gyldig",
    }),
    kontaktTlf: z.string({
        required_error: "Telefonnummer til kontakperson må fylles ut",
    }),

    antallBerørt: z.coerce.number({
        required_error: "Antall berørte må fylles ut",
        invalid_type_error: "Antall berørte må være et tall",
    }),

    årsakskode: z.enum([ÅrsakskodeKeys[0], ...ÅrsakskodeKeys], { // magic-ref https://github.com/colinhacks/zod/discussions/839#discussioncomment-1885806
        required_error: "Årsak må fylles ut",
    }),
    årsakstekst: z.string().optional(), // validated by årsakskode
    yrkeskategorier: z.array(Yrkeskategori).refine((yrkeskategorier) => yrkeskategorier.length > 0, {
        // nonEmpty på array resulterer i ts error på filtrering av array,
        // derfor gjøres dette i refine i stedet for som z.array(Yrkeskategori).nonEmpty()
        message: 'Du må velge minst én yrkeskategori',
        path: ['yrkeskategorier'],
    }),

    startDato: z.coerce.date({
        required_error: "Startdato må fylles ut",
    }),
    sluttDato: z.coerce.date().optional(),
    ukjentSluttDato: z.boolean().default(false),

    fritekst: z.string(),
    sendtInnTidspunkt: z.coerce.date(),
});
export type Permitteringsskjema = z.infer<typeof Permitteringsskjema>;
export type SkjemaType = z.infer<typeof SkjemaType>;
