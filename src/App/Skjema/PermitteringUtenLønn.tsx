import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    DatePicker,
    ErrorSummary,
    Heading,
    HStack,
    Select,
    TextField,
    useDatepicker,
    VStack
} from "@navikt/ds-react";
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {VirksomhetsvelgerWrapper} from "./VirksomhetsvelgerWrapper";
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {
    Permitteringsskjema,
    Yrkeskategori,
    Årsakskode,
    ÅrsakskodeKeys,
    Årsakskoder
} from "../../types/Permitteringsskjema";
import {z} from "zod";
import './Skjema.css';
import Yrkeskategorivelger from "../komponenter/Yrkeskategorivelger/Yrkeskategorivelger";
import {Oppsummering} from "./Oppsummering";

const PermitteringUtenLønnSkjema = z.object({
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

    startDato: z.date({
        required_error: "Startdato må fylles ut",
    }),
    sluttDato: z.date().optional(),
    ukjentSluttDato: z.boolean().default(false),
}).refine((skjema) => {
    return skjema.ukjentSluttDato || skjema.sluttDato;
}, {
    message: 'Du må oppgi en sluttdato eller huke av for at sluttdato er ukjent',
    path: ['sluttDato'],
}).refine((skjema) => {
    if (skjema.sluttDato && skjema.startDato) {
        return skjema.sluttDato >= skjema.startDato;
    }
    return true;
}, {
    message: 'Sluttdato må være etter startdato',
    path: ['sluttDato'],
});
type PermitteringUtenLønnSkjema = z.infer<typeof PermitteringUtenLønnSkjema>;

const lagFritekst = (yrker: Yrkeskategori[], årsak: Årsakskode) => {
    return '### Yrker\n' + yrker.map(({label}) => label).join(', ') + '\n### Årsak\n' + Årsakskoder[årsak];
};

export const PermitteringUtenLønn: FunctionComponent = () => {
    const [feilmeldinger, setFeilmeldinger] = React.useState<{ id: string, msg: string }[]>([]);
    const errorRef = useRef<HTMLDivElement>(null);
    const oppsummeringRef = useRef<HTMLHeadingElement>(null);
    const [skjema, setSkjema] = useState<PermitteringUtenLønnSkjema>({
        yrkeskategorier: [] as Yrkeskategori[],
    } as PermitteringUtenLønnSkjema);
    const [skjemaTilOppsummering, setSkjemaTilOppsummering] = useState<Permitteringsskjema>();
    const {datepickerProps: startDatoDatepicker, inputProps: startDatoInput} = useDatepicker({
        onDateChange: (startDato) => {
            if (startDato === undefined) {
                const {startDato, ...skjemaUtenStartDato} = skjema;
                setSkjema({...skjemaUtenStartDato as PermitteringUtenLønnSkjema});
            } else {
                setSkjema({...skjema, startDato});
            }
        },
    });
    const {
        datepickerProps: sluttDatoDatepicker,
        inputProps: sluttDatoInput,
        setSelected: nullStillSluttdato
    } = useDatepicker({
        onDateChange: (sluttDato) => {
            if (sluttDato === undefined) {
                const {sluttDato, ...skjemaUtenStartDato} = skjema;
                setSkjema({...skjemaUtenStartDato as PermitteringUtenLønnSkjema});
            } else {
                setSkjema({...skjema, sluttDato: sluttDato});
            }
        },
    });

    useEffect(() => {
        if (skjema.ukjentSluttDato) {
            nullStillSluttdato();
        }
    }, [skjema.ukjentSluttDato]);

    useEffect(() => {
        if (feilmeldinger.length > 0) {
            errorRef?.current && errorRef.current.focus();
        }
    }, [JSON.stringify(feilmeldinger)]);

    const validate = () => {
        const result = PermitteringUtenLønnSkjema.safeParse(skjema);
        if (!result.success) {
            setFeilmeldinger(
                result.error.issues.map(({path, message}) => (
                    {id: path[0] as string, msg: message}
                )));
        } else {
            setSkjemaTilOppsummering({
                ...skjema,
                type: 'PERMITTERING_UTEN_LØNN',
                årsakstekst: Årsakskoder[skjema.årsakskode],
                fritekst: lagFritekst(skjema.yrkeskategorier, skjema.årsakskode),
            });
        }
    };

    return (skjemaTilOppsummering !== undefined)
        ? <Side tittel="Permittering uten lønn">
            <Oppsummering
                ref={oppsummeringRef}
                skjema={skjemaTilOppsummering}
                onSendInn={() => console.log('send inn')}
                onTilbake={() => setSkjemaTilOppsummering(undefined)}
            />
        </Side>
        : <Side tittel="Permittering uten lønn">
            <Breadcrumbs breadcrumb={{
                url: '/skjema/PERMITTERING_UTEN_LØNN',
                title: 'Permittering uten lønn'

            }}/>
            <Box
                background="bg-default"
                borderRadius="small"
                padding={{xs: '2', md: '4', lg: '8'}}
            >
                <form className="skjema" onSubmit={(e) => {
                    e.preventDefault();
                    validate();
                }}>
                    <VStack gap="8">

                        {feilmeldinger.length > 0 && (
                            <ErrorSummary ref={errorRef} heading="Feilmeldinger">
                                {feilmeldinger.map(({id, msg}) => (
                                    <ErrorSummary.Item key={id} href={`#${id}`}>
                                        {msg}
                                    </ErrorSummary.Item>
                                ))}
                            </ErrorSummary>
                        )}

                        <VirksomhetsvelgerWrapper onOrganisasjonChange={(org) => {
                            setSkjema({...skjema, bedriftNr: org.OrganizationNumber, bedriftNavn: org.Name})
                        }}/>

                        <fieldset>
                            <Heading as={'legend' as React.ElementType} size="medium" level="2">
                                Kontaktperson i virksomheten
                            </Heading>

                            <TextField
                                label="Navn"
                                id="kontaktNavn"
                                autoComplete="name"
                                value={skjema.kontaktNavn}
                                onChange={(e) => setSkjema({...skjema, kontaktNavn: e.target.value})}
                                error={feilmeldinger.find(value => value.id === 'kontaktNavn')?.msg}
                            />

                            <TextField
                                label='E-post'
                                id="kontaktEpost"
                                inputMode='email'
                                autoComplete="email"
                                value={skjema.kontaktEpost}
                                onChange={(e) => setSkjema({...skjema, kontaktEpost: e.target.value})}
                                error={feilmeldinger.find(value => value.id === 'kontaktEpost')?.msg}
                            />

                            <TextField
                                label='Telefonnummer'
                                id="kontaktTlf"
                                inputMode='tel'
                                autoComplete="tel"
                                value={skjema.kontaktTlf}
                                onChange={(e) => setSkjema({...skjema, kontaktTlf: e.target.value})}
                                error={feilmeldinger.find(value => value.id === 'kontaktTlf')?.msg}
                            />
                        </fieldset>

                        <fieldset>
                            <Heading as={'legend' as React.ElementType} size="medium" level="2">
                                Opplysninger om permitteringene
                            </Heading>

                            <TextField
                                label="Hvor mange ansatte blir permittert?"
                                id="antallBerørt"
                                autoComplete="off"
                                inputMode="numeric"
                                value={skjema.antallBerørt}
                                onChange={(e) => setSkjema({
                                    ...skjema,
                                    antallBerørt: e.target.value as unknown as number
                                })}
                                error={feilmeldinger.find(value => value.id === 'antallBerørt')?.msg}
                            />
                            <Select
                                label="Hva er årsaken til permitteringene?"
                                id="årsakskode"
                                value={skjema.årsakskode}
                                onChange={(e) => setSkjema({
                                    ...skjema,
                                    årsakskode: e.target.value as Årsakskode,
                                    årsakstekst: Årsakskoder[e.target.value as Årsakskode]
                                })}
                                error={feilmeldinger.find(value => value.id === 'årsakskode')?.msg}
                            >
                                <option value="">Velg årsak</option>
                                {Object.entries(Årsakskoder).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </Select>

                            <Yrkeskategorivelger
                                id="yrkeskategorier"
                                label="Hvilke yrkeskategorier skal du permittere?"
                                error={feilmeldinger.find(value => value.id === 'yrkeskategorier')?.msg}
                                yrkeskategorier={skjema.yrkeskategorier}
                                leggTilYrkeskategori={(yrkeskategori) => {
                                    setSkjema({...skjema, yrkeskategorier: [...skjema.yrkeskategorier, yrkeskategori]})
                                }}
                                fjernYrkeskategori={({konseptId}) => {
                                    setSkjema({
                                        ...skjema,
                                        yrkeskategorier: skjema.yrkeskategorier.filter(y => y.konseptId !== konseptId)
                                    })
                                }}
                            />

                            <HStack gap="4">
                                <DatePicker {...startDatoDatepicker} >
                                    <DatePicker.Input
                                        {...startDatoInput}
                                        id="startDato"
                                        label="Permitteringene starter"
                                        error={feilmeldinger.find(value => value.id === 'startDato')?.msg}
                                    />
                                </DatePicker>

                                <div>
                                    <DatePicker {...sluttDatoDatepicker}>
                                        <DatePicker.Input
                                            {...sluttDatoInput}
                                            id="sluttDato"
                                            label="Permitteringene slutter"
                                            error={feilmeldinger.find(value => value.id === 'sluttDato')?.msg}
                                        />
                                    </DatePicker>
                                    <Checkbox
                                        value={skjema.ukjentSluttDato}
                                        onChange={(e) => {
                                            setSkjema({...skjema, ukjentSluttDato: e.target.checked});
                                        }}
                                    >Vet ikke hvor lenge det vil vare</Checkbox>
                                </div>
                            </HStack>
                        </fieldset>

                        <Button htmlType="submit">Kontroller opplysningene</Button>
                        <Button variant="tertiary" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/permittering";
                        }}>Avbryt</Button>
                    </VStack>
                </form>
            </Box>
        </Side>;
}

