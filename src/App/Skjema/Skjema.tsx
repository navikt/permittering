import {
    Permitteringsskjema,
    SkjemaType,
    Yrkeskategori,
    Årsakskode,
    Årsakskoder,
} from '../../types/Permitteringsskjema';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    DatePicker,
    Detail,
    ErrorSummary,
    Heading,
    HStack,
    Select,
    TextField,
    useDatepicker,
    VStack,
} from '@navikt/ds-react';
import { VirksomhetsvelgerWrapper } from './VirksomhetsvelgerWrapper';
import Yrkeskategorivelger from '../komponenter/Yrkeskategorivelger/Yrkeskategorivelger';
import { Side } from '../Side';
import { Breadcrumbs } from './Breadcrumbs';
import { Oppsummering } from './Oppsummering';
import './Skjema.css';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { useLoggBedriftValgt, useLoggKlikk } from '../../utils/funksjonerForAmplitudeLogging';

type LabledeFelter = Pick<
    Permitteringsskjema,
    | 'antallBerørt'
    | 'årsakskode'
    | 'yrkeskategorier'
    | 'startDato'
    | 'sluttDato'
    | 'ukjentSluttDato'
>;
export const labels: Record<SkjemaType, Record<keyof LabledeFelter, string>> = {
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
};
export const headings: Record<SkjemaType, string> = {
    PERMITTERING_UTEN_LØNN: 'Opplysninger om permitteringene',
    MASSEOPPSIGELSE: 'Opplysninger om masseoppsigelsen',
    INNSKRENKNING_I_ARBEIDSTID: 'Opplysninger om innskrenkning i arbeidstid',
};
export const sidetitler: Record<SkjemaType, string> = {
    PERMITTERING_UTEN_LØNN: 'Permittering uten lønn',
    MASSEOPPSIGELSE: 'Masseoppsigelse',
    INNSKRENKNING_I_ARBEIDSTID: 'Innskrenkning i arbeidstid',
};

export const Skjema: FunctionComponent<{ type: SkjemaType }> = ({ type }) => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();
    const [skjema, setSkjema] = useState<Permitteringsskjema>({
        type,
        yrkeskategorier: [] as Yrkeskategori[],
    } as Permitteringsskjema);

    return (
        <Side tittel={sidetitler[skjema.type]}>
            <Breadcrumbs
                breadcrumb={{
                    url: `/skjema/${skjema.type}`,
                    title: sidetitler[skjema.type],
                }}
            />
            {validertSkjema ? (
                <Oppsummering
                    skjema={validertSkjema}
                    onTilbake={() => setValidertSkjema(undefined)}
                />
            ) : (
                <FormMedValidering
                    skjema={skjema}
                    setSkjema={setSkjema}
                    onSkjemaValidert={setValidertSkjema}
                />
            )}
        </Side>
    );
};

const FormMedValidering: FunctionComponent<{
    onSkjemaValidert: (value: Permitteringsskjema | undefined) => void;
    skjema: Permitteringsskjema;
    setSkjema: (skjema: Permitteringsskjema) => void;
}> = ({ onSkjemaValidert, skjema, setSkjema }) => {
    const [valideringsFeil, setValideringsFeil] = useState<{
        autoFocus: boolean;
        issues: { id: string; msg: string }[];
    }>({ autoFocus: false, issues: [] });

    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { autoFocus, issues } = valideringsFeil;
        if (autoFocus && issues.length > 0) {
            errorRef?.current && errorRef.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                errorRef?.current && errorRef.current.focus();
            }, 500);
        }
    }, [JSON.stringify(valideringsFeil)]);

    useLoggBedriftValgt(skjema.bedriftNr);
    const logKlikk = useLoggKlikk();

    const validate = () => {
        const result = Permitteringsskjema.safeParse(skjema);
        if (!result.success) {
            setValideringsFeil({
                autoFocus: true,
                issues: result.error.issues.map(({ path, message }) => ({
                    id: path[0] as string,
                    msg: message,
                })),
            });
        } else {
            onSkjemaValidert(skjema);
        }
    };

    const tømValideringsfeil = (id: string) =>
        setValideringsFeil({
            autoFocus: false,
            issues: valideringsFeil.issues.filter((value) => value.id !== id),
        });

    const valideringsFeilForFelt = (id: string) =>
        valideringsFeil.issues.find((value) => value.id === id)?.msg;

    return (
        <Box
            background="bg-default"
            borderRadius="small"
            padding={{ xs: '4', sm: '4', md: '4', lg: '8' }}
        >
            <form
                className="skjema"
                onSubmit={(e) => {
                    logKlikk('kontroller opplysningene', { type: skjema.type });
                    e.preventDefault();
                    validate();
                }}
            >
                <VStack gap="8">
                    {valideringsFeil.issues.length > 0 && (
                        <ErrorSummary ref={errorRef} heading="Feilmeldinger">
                            {valideringsFeil.issues.map(({ id, msg }) => (
                                <ErrorSummary.Item key={id} href={`#${id}`}>
                                    {msg}
                                </ErrorSummary.Item>
                            ))}
                        </ErrorSummary>
                    )}

                    <fieldset>
                        <Heading as={'legend' as React.ElementType} size="medium" level="2" spacing>
                            Velg underenhet
                        </Heading>

                        <VirksomhetsvelgerWrapper
                            onOrganisasjonChange={(org) => {
                                setSkjema({
                                    ...skjema,
                                    bedriftNr: org.OrganizationNumber,
                                    bedriftNavn: org.Name,
                                });
                            }}
                        />
                    </fieldset>

                    <fieldset>
                        <Heading as={'legend' as React.ElementType} size="medium" level="2" spacing>
                            Kontaktperson i virksomheten
                        </Heading>
                        <Detail>Alle felt må fylles ut</Detail>

                        <TextField
                            label="Navn"
                            id="kontaktNavn"
                            autoComplete="name"
                            value={skjema.kontaktNavn}
                            onChange={(e) => {
                                setSkjema({ ...skjema, kontaktNavn: e.target.value });
                                tømValideringsfeil('kontaktNavn');
                            }}
                            error={valideringsFeilForFelt('kontaktNavn')}
                        />

                        <TextField
                            label="E-post"
                            id="kontaktEpost"
                            inputMode="email"
                            autoComplete="email"
                            value={skjema.kontaktEpost}
                            onChange={(e) => {
                                setSkjema({ ...skjema, kontaktEpost: e.target.value });
                                tømValideringsfeil('kontaktEpost');
                            }}
                            error={valideringsFeilForFelt('kontaktEpost')}
                        />

                        <TextField
                            label="Telefonnummer"
                            id="kontaktTlf"
                            inputMode="tel"
                            autoComplete="tel"
                            value={skjema.kontaktTlf}
                            onChange={(e) => {
                                setSkjema({ ...skjema, kontaktTlf: e.target.value });
                                tømValideringsfeil('kontaktTlf');
                            }}
                            error={valideringsFeilForFelt('kontaktTlf')}
                        />
                    </fieldset>

                    <fieldset>
                        <Heading as={'legend' as React.ElementType} size="medium" level="2" spacing>
                            {headings[skjema.type]}
                        </Heading>
                        <Detail>Alle felt må fylles ut</Detail>

                        <TextField
                            label={labels[skjema.type].antallBerørt}
                            id="antallBerørt"
                            autoComplete="off"
                            inputMode="numeric"
                            value={skjema.antallBerørt}
                            onChange={(e) => {
                                setSkjema({
                                    ...skjema,
                                    antallBerørt: e.target.value as unknown as number,
                                });
                                tømValideringsfeil('antallBerørt');
                            }}
                            error={valideringsFeilForFelt('antallBerørt')}
                        />
                        <Select
                            label={labels[skjema.type].årsakskode}
                            id="årsakskode"
                            value={skjema.årsakskode}
                            onChange={(e) => {
                                setSkjema({
                                    ...skjema,
                                    årsakskode: e.target.value as Årsakskode,
                                    årsakstekst: Årsakskoder[e.target.value as Årsakskode],
                                });
                                tømValideringsfeil('årsakskode');
                            }}
                            error={valideringsFeilForFelt('årsakskode')}
                        >
                            <option value="">Velg årsak</option>
                            {Object.entries(Årsakskoder).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </Select>

                        <Yrkeskategorivelger
                            id="yrkeskategorier"
                            label={labels[skjema.type].yrkeskategorier}
                            error={valideringsFeilForFelt('yrkeskategorier')}
                            yrkeskategorier={skjema.yrkeskategorier}
                            leggTilYrkeskategori={(yrkeskategori) => {
                                setSkjema({
                                    ...skjema,
                                    yrkeskategorier: [...skjema.yrkeskategorier, yrkeskategori],
                                });
                                tømValideringsfeil('yrkeskategorier');
                            }}
                            fjernYrkeskategori={({ konseptId }) => {
                                setSkjema({
                                    ...skjema,
                                    yrkeskategorier: skjema.yrkeskategorier.filter(
                                        (y) => y.konseptId !== konseptId
                                    ),
                                });
                                tømValideringsfeil('yrkeskategorier');
                            }}
                        />

                        <HStack gap="4">
                            <DatoVelger
                                skjema={skjema}
                                setSkjema={setSkjema}
                                tømValideringsfeil={tømValideringsfeil}
                                valideringsFeilForFelt={valideringsFeilForFelt}
                            />
                        </HStack>
                    </fieldset>

                    <Button type="submit">Kontroller opplysningene</Button>
                    <Button
                        variant="tertiary"
                        onClick={(e) => {
                            logKlikk('avbryt', { type: skjema.type });
                            e.preventDefault();
                            window.location.href = '/permittering';
                        }}
                    >
                        Avbryt
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

type DatoVelgerProps = {
    skjema: Permitteringsskjema;
    setSkjema: (skjema: Permitteringsskjema) => void;
    valideringsFeilForFelt: (id: string) => string | undefined;
    tømValideringsfeil: (id: string) => void;
};
// workaround for date shift due to toIsoString() returning date in UTC and DatePicker date being 00:00+1
const dateMidDay = (date: Date): Date => {
    const midDay = new Date(date);
    midDay.setHours(12, 0, 0, 0);
    return midDay;
};
const DatoVelger: FunctionComponent<DatoVelgerProps> = ({
    skjema,
    setSkjema,
    valideringsFeilForFelt,
    tømValideringsfeil,
}) => {
    const { datepickerProps: startDatoDatepicker, inputProps: startDatoInput } = useDatepicker({
        defaultSelected: skjema.startDato,
        onDateChange: (dato) => {
            if (dato === undefined) {
                const { startDato, ...skjemaUtenStartDato } = skjema;
                setSkjema({ ...(skjemaUtenStartDato as Permitteringsskjema) });
            } else {
                setSkjema({ ...skjema, startDato: dateMidDay(dato) });
            }
            tømValideringsfeil('startDato');
        },
    });

    const {
        datepickerProps: sluttDatoDatepicker,
        inputProps: sluttDatoInput,
        setSelected: nullStillSluttdato,
    } = useDatepicker({
        defaultSelected: skjema.sluttDato,
        onDateChange: (dato) => {
            if (dato === undefined) {
                const { sluttDato, ...skjemaUtenStartDato } = skjema;
                setSkjema({ ...(skjemaUtenStartDato as Permitteringsskjema) });
            } else {
                setSkjema({ ...skjema, sluttDato: dateMidDay(dato), ukjentSluttDato: false });
            }
            tømValideringsfeil('sluttDato');
        },
    });

    useEffect(() => {
        if (skjema.ukjentSluttDato) {
            nullStillSluttdato();
        }
    }, [skjema.ukjentSluttDato]);

    return (
        <>
            <DatePicker {...startDatoDatepicker}>
                <DatePicker.Input
                    {...startDatoInput}
                    id="startDato"
                    label={labels[skjema.type].startDato}
                    error={valideringsFeilForFelt('startDato')}
                />
            </DatePicker>

            {skjema.type !== 'PERMITTERING_UTEN_LØNN' ? null : (
                <div>
                    <DatePicker {...sluttDatoDatepicker}>
                        <DatePicker.Input
                            {...sluttDatoInput}
                            id="sluttDato"
                            label={labels[skjema.type].sluttDato}
                            error={valideringsFeilForFelt('sluttDato')}
                        />
                    </DatePicker>
                    <Checkbox
                        checked={skjema.ukjentSluttDato}
                        onChange={(e) => {
                            setSkjema({ ...skjema, ukjentSluttDato: e.target.checked });
                            tømValideringsfeil('sluttDato');
                        }}
                    >
                        {labels[skjema.type].ukjentSluttDato}
                    </Checkbox>
                </div>
            )}
        </>
    );
};
