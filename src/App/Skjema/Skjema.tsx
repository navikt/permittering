import {Permitteringsskjema, SkjemaType, Yrkeskategori, Årsakskode, Årsakskoder} from "../../types/Permitteringsskjema";
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
import {VirksomhetsvelgerWrapper} from "./VirksomhetsvelgerWrapper";
import Yrkeskategorivelger from "../komponenter/Yrkeskategorivelger/Yrkeskategorivelger";
import {useLagreSkjema} from "../../api/permittering-api";
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {Oppsummering} from "./Oppsummering";
import './Skjema.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';


type LabledeFelter = Pick<
    Permitteringsskjema,
    'antallBerørt' | 'årsakskode' | 'yrkeskategorier' | 'startDato' | 'sluttDato' | 'ukjentSluttDato'
>;
const labels: Record<SkjemaType, Record<keyof LabledeFelter, string>> = {
    PERMITTERING_UTEN_LØNN: {
        antallBerørt: 'Hvor mange ansatte blir permittert?',
        årsakskode: 'Hvorfor skal dere permittere?',
        yrkeskategorier: 'Hvilke yrkeskategorier skal dere permittere?',
        startDato: 'Permittering starter',
        sluttDato: 'Permittering slutter',
        ukjentSluttDato: 'Vet ikke hvor lenge det vil vare',
    },
    MASSEOPPSIGELSE: {
        antallBerørt: 'Hvor mange ansatte blir sagt opp?',
        årsakskode: 'Hvorfor skal dere si opp?',
        yrkeskategorier: 'Hvilke yrkeskategorier skal dere si opp?',
        startDato: 'Masseoppsigelsen starter',
        sluttDato: '', // ikke relevant for denne typen
        ukjentSluttDato: '', // ikke relevant for denne typen
    },
    INNSKRENKNING_I_ARBEIDSTID: {
        antallBerørt: 'Hvor mange ansatte får sin arbeidstid innskrenket?',
        årsakskode: 'Hvorfor skal dere innskrenke arbeidstiden?',
        yrkeskategorier: 'Hvilke yrkeskategorier skal dere innskrenke arbeidstiden for?',
        startDato: 'Innskrenkning av arbeidstiden starter',
        sluttDato: '', // ikke relevant for denne typen
        ukjentSluttDato: '', // ikke relevant for denne typen
    },
}
const headings: Record<SkjemaType, string> = {
    PERMITTERING_UTEN_LØNN: 'Opplysninger om permitteringene',
    MASSEOPPSIGELSE: 'Opplysninger om masseoppsigelsen',
    INNSKRENKNING_I_ARBEIDSTID: 'Opplysninger om innskrenkning i arbeidstid',
}
export const sidetitler: Record<SkjemaType, string> = {
    PERMITTERING_UTEN_LØNN: 'Permittering uten lønn',
    MASSEOPPSIGELSE: 'Masseoppsigelse',
    INNSKRENKNING_I_ARBEIDSTID: 'Innskrenkning i arbeidstid',
}


export const Skjema: FunctionComponent<{ type: SkjemaType }> = ({type}) => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();
    const [skjema, setSkjema] = useState<Permitteringsskjema>(
        {
            type,
            yrkeskategorier: [] as Yrkeskategori[]
        } as Permitteringsskjema
    );
    const {lagreSkjema, error} = useLagreSkjema();

    // TODO: vis error ved feil og naviger til kvittering ved success
    return <Side tittel={sidetitler[skjema.type]}>
        <Breadcrumbs breadcrumb={{
            url: `/skjema/${skjema.type}`,
            title: sidetitler[skjema.type]
        }}/>
        {
            validertSkjema
                ? <Oppsummering
                    skjema={validertSkjema}
                    onTilbake={() => setValidertSkjema(undefined)}
                    onSendInn={lagreSkjema}
                />

                : <FormMedValidering
                    skjema={skjema}
                    setSkjema={setSkjema}
                    onSkjemaValidert={setValidertSkjema}
                />
        }
    </Side>;
}

const FormMedValidering: FunctionComponent<{
    onSkjemaValidert: (value: Permitteringsskjema | undefined) => void
    skjema: Permitteringsskjema,
    setSkjema: (skjema: Permitteringsskjema) => void,
}> = (
    {
        onSkjemaValidert,
        skjema,
        setSkjema,
    },
) => {
    const [feilmeldinger, setFeilmeldinger] = React.useState<{ id: string, msg: string }[]>([]);
    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // TODO: prevent focus when feilmelding is removed
        if (feilmeldinger.length > 0) {
            errorRef?.current && errorRef.current.scrollIntoView({behavior: 'smooth'});
            setTimeout(() => {
                errorRef?.current && errorRef.current.focus();
            }, 500);
        }
    }, [JSON.stringify(feilmeldinger)]);

    const validate = () => {
        const result = Permitteringsskjema.safeParse(skjema);
        if (!result.success) {
            setFeilmeldinger(
                result.error.issues.map(({path, message}) => (
                    {id: path[0] as string, msg: message}
                )));
        } else {
            onSkjemaValidert({
                ...skjema,

                // TODO: opprettelse av disse burde flyttes til backend
                fritekst: lagFritekst(skjema.yrkeskategorier, skjema.årsakskode),
                sendtInnTidspunkt: new Date(),
            });
        }
    };

    return <Box
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
                    <Heading as={'legend' as React.ElementType} size="medium" level="2" spacing>
                        Kontaktperson i virksomheten
                    </Heading>

                    <TextField
                        label="Navn"
                        id="kontaktNavn"
                        autoComplete="name"
                        value={skjema.kontaktNavn}
                        onChange={(e) => {
                            setSkjema({...skjema, kontaktNavn: e.target.value});
                            setFeilmeldinger(feilmeldinger.filter(value => value.id !== 'kontaktNavn'));
                        }}
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
                    <Heading as={'legend' as React.ElementType} size="medium" level="2" spacing>
                        {headings[skjema.type]}
                    </Heading>

                    <TextField
                        label={labels[skjema.type].antallBerørt}
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
                        label={labels[skjema.type].årsakskode}
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
                        label={labels[skjema.type].yrkeskategorier}
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
                        <DatoVelger skjema={skjema} setSkjema={setSkjema} feilmeldinger={feilmeldinger}/>
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
}

type DatoVelgerProps = {
    skjema: Permitteringsskjema,
    setSkjema: (skjema: Permitteringsskjema) => void,
    feilmeldinger: { id: string, msg: string }[],
}
const DatoVelger: FunctionComponent<DatoVelgerProps> = (
    {
        skjema,
        setSkjema,
        feilmeldinger,
    }
) => {
    const {datepickerProps: startDatoDatepicker, inputProps: startDatoInput} = useDatepicker({
        defaultSelected: skjema.startDato,
        onDateChange: (dato) => {
            if (dato === undefined) {
                const {startDato, ...skjemaUtenStartDato} = skjema;
                setSkjema({...skjemaUtenStartDato as Permitteringsskjema});
            } else {
                setSkjema({...skjema, startDato: dato});
            }
        },
    });

    const {
        datepickerProps: sluttDatoDatepicker,
        inputProps: sluttDatoInput,
        setSelected: nullStillSluttdato
    } = useDatepicker({
        defaultSelected: skjema.sluttDato,
        onDateChange: (dato) => {
            if (dato === undefined) {
                const {sluttDato, ...skjemaUtenStartDato} = skjema;
                setSkjema({...skjemaUtenStartDato as Permitteringsskjema});
            } else {
                setSkjema({...skjema, sluttDato: dato, ukjentSluttDato: false});
            }
        },
    });

    useEffect(() => {
        if (skjema.ukjentSluttDato) {
            nullStillSluttdato();
        }
    }, [skjema.ukjentSluttDato]);

    // TODO: mister dato ved tilbakeknapp, kan settes via selected, men får TS error
    return <>
        <DatePicker {...startDatoDatepicker}>
            <DatePicker.Input
                {...startDatoInput}
                id="startDato"
                label={labels[skjema.type].startDato}
                error={feilmeldinger.find(value => value.id === 'startDato')?.msg}
            />
        </DatePicker>

        {skjema.type !== 'PERMITTERING_UTEN_LØNN'
            ? null
            : <div>
                <DatePicker {...sluttDatoDatepicker}>
                    <DatePicker.Input
                        {...sluttDatoInput}
                        id="sluttDato"
                        label={labels[skjema.type].sluttDato}
                        error={feilmeldinger.find(value => value.id === 'sluttDato')?.msg}
                    />
                </DatePicker>
                <Checkbox
                    checked={skjema.ukjentSluttDato}
                    onChange={(e) => {
                        setSkjema({...skjema, ukjentSluttDato: e.target.checked});
                    }}
                >{labels[skjema.type].ukjentSluttDato}</Checkbox>
            </div>
        }
    </>
}

const lagFritekst = (yrker: Yrkeskategori[], årsak: Årsakskode) => {
    return '### Yrker\n' + yrker.map(({label}) => label).join(', ') + '\n### Årsak\n' + Årsakskoder[årsak];
};