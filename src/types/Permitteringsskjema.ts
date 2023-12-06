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

export type Yrkeskategori = z.infer<typeof Yrkeskategori>;
export const Yrkeskategori = z.object({
    konseptId: z.number(),
    styrk08: z.string(),
    label: z.string(),
});

export type SkjemaType = z.infer<typeof SkjemaType>;
export const SkjemaType = z.enum(['MASSEOPPSIGELSE', 'PERMITTERING_UTEN_LØNN', 'INNSKRENKNING_I_ARBEIDSTID']);

export type Permitteringsskjema = z.infer<typeof Permitteringsskjema>;
export const Permitteringsskjema = z.object({
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

    startDato: z.any().transform((arg, ctx) => {
        if (arg === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Startdato må fylles ut',
                path: ['startDato'],
            });
            return z.NEVER;
        }

        try {
            return new Date(arg);
        } catch (e) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Startdato må være en gyldig dato',
                path: ['startDato'],
            });
            return z.NEVER;
        }
    }),

    sluttDato: z.coerce.date().optional(),
    ukjentSluttDato: z.boolean().default(false),


    // id er kun oppgitt når hentes fra backend
    id: z.string().optional(),

    // fritekst brukes kun i backend og har et dårlig navn. bør flyttes til bakcend og fjernes herfra
    fritekst: z.string().optional(),

    // sendtInnTidspunkt burde vært flyttet til backend, og kun vørt tilgjengelig på skjema som er sendt inn
    sendtInnTidspunkt: z.coerce.date().optional(),
}).refine((skjema) => {
    if (skjema.type === 'PERMITTERING_UTEN_LØNN') {
        return skjema.ukjentSluttDato || skjema.sluttDato;
    }
    return true;
}, {
    message: 'Du må oppgi en sluttdato eller huke av for at sluttdato er ukjent',
    path: ['sluttDato'],
}).refine((skjema) => {
    if (skjema.type === 'MASSEOPPSIGELSE' || skjema.type === 'INNSKRENKNING_I_ARBEIDSTID') {
        return true;
    }
    if (skjema.sluttDato && skjema.startDato) {
        return skjema.sluttDato >= skjema.startDato;
    }
    return true;
}, {
    message: 'Sluttdato må være etter startdato',
    path: ['sluttDato'],
});
