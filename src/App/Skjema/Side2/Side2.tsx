import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Checkbox, TextField } from '@navikt/ds-react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { useSkjemaSteg } from '../use-skjema-steg';
import { mergeFritekst, splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import Datovelger from '../../komponenter/Datovelger/Datovelger';
import { lagTekstBasertPaSkjemaType } from '../Side4-oppsummering/oppsummering-utils';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import Yrkeskategorivelger, {
    Sokeforslag,
} from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger';
import { Yrkeskategori } from '../../../types/permitteringsskjema';
import YrkeskategoriVisning from '../../komponenter/Yrkeskategorivelger/YrkeskategoriVisning';
import { Permitteringsårsaksvelger } from '../../komponenter/PermitteringsÅrsaksVelger/PermitteringsÅrsaksVelger';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import './Side2.css';
import Dekorator from '../../komponenter/Dekorator/Dekorator';

const Side2: FunctionComponent = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);

    const startDato = context.skjema.startDato ? new Date(context.skjema.startDato) : undefined;
    const sluttDato = context.skjema.sluttDato ? new Date(context.skjema.sluttDato) : undefined;

    const [datoFra, setDatoFra] = useState<Date | undefined>(startDato);
    const [datoTil, setDatoTil] = useState<Date | undefined>(sluttDato);
    const [feilMeldingAntallBerort, setFeilmeldingAntallBerort] = useState('');

    let { yrkeskategorier = [] } = context.skjema;

    if (context.skjema.sendtInnTidspunkt) {
        history.replace('/');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('generelle-opplysninger');
    }, []);

    useEffect(() => {
        if (context.skjema.sluttDato && context.skjema.startDato) {
            setDatoFra(new Date(context.skjema.startDato));
            setDatoTil(new Date(context.skjema.sluttDato));
        }
        // eslint-disable-next-line
    }, [context.skjema.sluttDato, context.skjema.startDato]);

    useEffect(() => {
        if (context.skjema.ukjentSluttDato) {
            context.endreSkjemaVerdi('sluttDato', undefined);
            setDatoTil(undefined);
        }
        // eslint-disable-next-line
    }, [context.skjema.sluttDato, context.skjema.ukjentSluttDato]);

    useEffect(() => {
        if (
            context.skjema.årsakskode !== 'ANDRE_ÅRSAKER' &&
            context.skjema.årsakstekst !== null &&
            context.skjema.årsakskode !== undefined
        ) {
            context.endreSkjemaVerdi('årsakstekst', null);
        }
    }, [context]);

    let årsak = '';
    let yrker = '';
    let annet = '';
    if (context.skjema.fritekst) {
        const existerendeFelter = splittOppFritekst(context.skjema.fritekst);
        if (existerendeFelter.årsak) {
            årsak = existerendeFelter.årsak;
        }
        if (existerendeFelter.yrker) {
            yrker = existerendeFelter.yrker;
        }
        if (existerendeFelter.annet) {
            annet = existerendeFelter.annet;
        }
    }

    const lagYrkerTekst = (yrkeskategorier: Yrkeskategori[]): string => {
        let yrkertekst = '';
        yrkeskategorier.map((yrke: Yrkeskategori, index: number) => {
            const erSisteElement = yrkeskategorier.length === index + 1;
            return (yrkertekst += `${yrke.label}${erSisteElement ? '' : ', '}`);
        });
        return yrkertekst;
    };

    const leggTilYrkeskategori = (nyYrkeskategori: Sokeforslag) => {
        const yrkeskategorierCopy = [...yrkeskategorier];
        const nyKategori: Yrkeskategori = {
            konseptId: parseInt(nyYrkeskategori.key),
            label: nyYrkeskategori.value,
            styrk08: nyYrkeskategori.styrk08 ? nyYrkeskategori.styrk08 : '',
        };
        yrkeskategorierCopy.push(nyKategori);
        setYrkeskategorier(yrkeskategorierCopy);
    };

    const setYrkeskategorier = (yrkeskategorier: Yrkeskategori[]) => {
        const fritekstFelter: any = { årsak, yrker, annet };
        fritekstFelter['yrker'] = lagYrkerTekst(yrkeskategorier);
        context.endreFritekstOgVerdi(
            'yrkeskategorier',
            yrkeskategorier,
            mergeFritekst(fritekstFelter)
        );
    };

    const erGyldigNr = (nr: string) => {
        return nr.match(/^[0-9]+$/) != null;
    };

    const setÅrsaksKode = (årsaksKode: string) => {
        const fritekstFelter: any = { årsak, yrker, annet };
        if (årsaksKode === 'VELG_ÅRSAK') {
            fritekstFelter['årsak'] = '';
            context.endreFritekstOgVerdi('årsakskode', null, mergeFritekst(fritekstFelter));
        } else if (årsaksKode === 'ANDRE_ÅRSAKER') {
            fritekstFelter['årsak'] = årsaksKode;
            context.endreSkjemaVerdi('årsakskode', årsaksKode);
        } else {
            finnÅrsakstekst(årsaksKode).then((lesbarårsak) => {
                fritekstFelter['årsak'] = lesbarårsak;
                context.endreFritekstOgVerdi(
                    'årsakskode',
                    årsaksKode,
                    mergeFritekst(fritekstFelter)
                );
            });
        }
    };

    const { steg, forrigeSide, nesteSide } = useSkjemaSteg(context.skjema.id);

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <Systemtittel>Generelle opplysninger</Systemtittel>
                <div className="skjema-innhold__side-2-text-area">
                    <TextField
                        label="Hvor mange ansatte blir berørt?"
                        defaultValue={context.skjema.antallBerørt}
                        size="small"
                        error={feilMeldingAntallBerort}
                        onBlur={(event: any) => {
                            if (erGyldigNr(event.currentTarget.value)) {
                                context.endreSkjemaVerdi('antallBerørt', event.currentTarget.value);
                                setFeilmeldingAntallBerort('');
                            } else setFeilmeldingAntallBerort('Vennligst oppgi et tall');
                        }}
                        onChange={() => setFeilmeldingAntallBerort('')}
                    />
                </div>

                <div className="skjema-innhold__side-2-text-area">
                    <Permitteringsårsaksvelger
                        label={lagTekstBasertPaSkjemaType(context.skjema.type)}
                        valgtårsak={context.skjema.årsakskode || 'Velg årsak'}
                        setÅrsak={setÅrsaksKode}
                    />
                </div>

                <div className="skjema-innhold__side-2-text-area">
                    <Yrkeskategorivelger
                        yrkeskategorier={yrkeskategorier}
                        leggTilYrkeskategori={leggTilYrkeskategori}
                    />
                    {yrkeskategorier.length ? (
                        <Normaltekst className="yrker-valgt__overskrift">Du har valgt:</Normaltekst>
                    ) : null}
                    <YrkeskategoriVisning
                        yrkeskategorier={yrkeskategorier}
                        setYrkeskategorier={setYrkeskategorier}
                    />
                </div>

                <Element className="skjema-innhold__side-2-dato-overskrift">
                    For hvilken periode gjelder dette?
                </Element>
                <div className="skjema-innhold__side-2-dato-container">
                    <Datovelger
                        value={datoFra}
                        onChange={(event) => {
                            context.endreSkjemaVerdi('startDato', event.currentTarget.value);
                            setDatoFra(event.currentTarget.value);
                        }}
                        skalVareFoer={datoTil}
                        overtekst={'Fra'}
                    />
                    {context.skjema.type === 'PERMITTERING_UTEN_LØNN' && (
                        <div className="skjema-innhold__dato-velger-til">
                            <Datovelger
                                value={datoTil}
                                onChange={(event) => {
                                    context.endreSkjemaVerdi(
                                        'sluttDato',
                                        event.currentTarget.value
                                    );
                                    setDatoTil(event.currentTarget.value);
                                }}
                                disabled={context.skjema.ukjentSluttDato}
                                overtekst={'Til'}
                                skalVareEtter={datoFra}
                            />
                            <Checkbox
                                className="skjema-innhold__dato-velger-til-checkboks"
                                checked={!!context.skjema.ukjentSluttDato}
                                onChange={() =>
                                    context.endreSkjemaVerdi(
                                        'ukjentSluttDato',
                                        !context.skjema.ukjentSluttDato
                                    )
                                }
                            >
                                Vet ikke hvor lenge det vil vare
                            </Checkbox>
                        </div>
                    )}
                </div>

                <div className="skjema-innhold__fram-og-tilbake">
                    <Button
                        variant="secondary"
                        onClick={async () => {
                            await context.lagre();
                            history.push(forrigeSide);
                        }}
                    >
                        {' '}
                        Tilbake
                    </Button>
                    <Button
                        onClick={async () => {
                            await context.lagre();
                            history.push(nesteSide);
                        }}
                    >
                        Neste
                    </Button>
                </div>
            </SkjemaRamme>
        </>
    );
};

export default Side2;
