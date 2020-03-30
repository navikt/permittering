import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Knapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { Element } from 'nav-frontend-typografi';
import Input from 'nav-frontend-skjema/lib/input';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import { SkjemaSideProps, useSkjemaSteg } from '../use-skjema-steg';
import { mergeFritekst, splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import Datovelger from '../../komponenter/Datovelger/Datovelger';
import Banner from '../../HovedBanner/HovedBanner';
import { lagTekstBasertPaSkjemaType } from '../Side4-oppsummering/oppsummering-utils';
import { Feature, FeatureToggleContext } from '../../FeatureToggleProvider';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import './Side2.less';
import Yrkeskategorivelger from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger';

const Side2: FunctionComponent<SkjemaSideProps> = () => {
    const [datoFra, setDatoFra] = useState(new Date());
    const [datoTil, setDatoTil] = useState(undefined);
    const [feilMeldingAntallBerort, setFeilmeldingAntallBerort] = useState('');

    const featureToggleContext = useContext(FeatureToggleContext);
    const tillatFnrInput = featureToggleContext[Feature.tillatFnrInput];
    const history = useHistory();
    const context = useContext(SkjemaContext);

    loggNavarendeSteg('generelle-opplysninger');

    useEffect(() => {
        if (context.skjema.ukjentSluttDato) {
            context.endreSkjemaVerdi('sluttDato', undefined);
            setDatoTil(undefined);
        }
        // eslint-disable-next-line
    }, [context.skjema.sluttDato, context.skjema.ukjentSluttDato]);

    let årsak = '';
    let annet = '';
    if (context.skjema.fritekst) {
        const existerendeFelter = splittOppFritekst(context.skjema.fritekst);
        if (existerendeFelter.årsak) {
            årsak = existerendeFelter.årsak;
        }
        if (existerendeFelter.annet) {
            annet = existerendeFelter.annet;
        }
    }

    const erGyldigNr = (nr: string) => {
        return nr.match(/^[0-9]+$/) != null;
    };

    const endreFritekstFelt = (key: string, value: string) => {
        const fritekstFelter: any = { årsak, annet };
        fritekstFelter[key] = value;
        context.endreSkjemaVerdi('fritekst', mergeFritekst(fritekstFelter));
    };

    const { forrigeSide, nesteSide } = useSkjemaSteg(history.location.pathname, context.skjema.id);

    return (
        <div>
            <Banner sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <Systemtittel>Generelle opplysninger</Systemtittel>
                {!tillatFnrInput && (
                    <div className="skjema-innhold__side-2-text-area">
                        <Input
                            label="Hvor mange ansatte blir berørt?"
                            defaultValue={context.skjema.antallBerørt}
                            bredde="XS"
                            feil={feilMeldingAntallBerort}
                            onBlur={(event: any) => {
                                if (erGyldigNr(event.currentTarget.value)) {
                                    context.endreSkjemaVerdi(
                                        'antallBerørt',
                                        event.currentTarget.value
                                    );
                                    setFeilmeldingAntallBerort('');
                                } else setFeilmeldingAntallBerort('Vennligst oppgi et tall');
                            }}
                            onChange={() => setFeilmeldingAntallBerort('')}
                        />
                    </div>
                )}

                <div className="skjema-innhold__side-2-text-area">
                    <Textarea
                        label={lagTekstBasertPaSkjemaType(context.skjema.type)}
                        value={årsak}
                        maxLength={1000}
                        onChange={event => endreFritekstFelt('årsak', event.currentTarget.value)}
                    />
                </div>

                <div className="skjema-innhold__side-2-text-area">
                    <Yrkeskategorivelger />
                </div>

                <Element className="skjema-innhold__side-2-dato-overskrift">
                    For hvilken periode gjelder dette?
                </Element>
                <div className="skjema-innhold__side-2-dato-container">
                    <Datovelger
                        value={context.skjema.startDato}
                        onChange={event => {
                            context.endreSkjemaVerdi('startDato', event.currentTarget.value);
                            setDatoFra(event.currentTarget.value);
                        }}
                        skalVareFoer={datoTil}
                        overtekst="Fra:"
                    />
                    <div className="skjema-innhold__dato-velger-til">
                        <Datovelger
                            value={context.skjema.sluttDato}
                            onChange={event => {
                                context.endreSkjemaVerdi('sluttDato', event.currentTarget.value);
                                setDatoTil(event.currentTarget.value);
                            }}
                            disabled={context.skjema.ukjentSluttDato}
                            overtekst="Til:"
                            skalVareEtter={datoFra}
                        />
                        <Checkbox
                            label="Vet ikke hvor lenge det vil vare"
                            checked={context.skjema.ukjentSluttDato}
                            onChange={() =>
                                context.endreSkjemaVerdi(
                                    'ukjentSluttDato',
                                    !context.skjema.ukjentSluttDato
                                )
                            }
                        />
                    </div>
                </div>
                <div className="skjema-innhold__side-2-text-area andre-opplysninger">
                    <Textarea
                        label="Andre relevante opplysninger (frivillig)"
                        value={annet}
                        maxLength={1000}
                        onChange={event => endreFritekstFelt('annet', event.currentTarget.value)}
                    />
                </div>
                <div className="skjema-innhold__fram-og-tilbake">
                    <Knapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(forrigeSide);
                        }}
                    >
                        {' '}
                        Tilbake
                    </Knapp>
                    <Hovedknapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(nesteSide);
                        }}
                    >
                        Neste
                    </Hovedknapp>
                </div>
            </SkjemaRamme>
        </div>
    );
};

export default Side2;
