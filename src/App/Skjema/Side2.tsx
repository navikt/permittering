import React, { FunctionComponent, useContext, useState } from 'react';
import './Skjema.less';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import Sidetittel from 'nav-frontend-typografi/lib/sidetittel';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { Textarea } from 'nav-frontend-skjema';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import 'react-day-picker/lib/style.css';
import Datovelger from '../komponenter/Datovelger/Datovelger';
import SkjemaRamme from '../komponenter/SkjemaRamme';
import { useHistory } from 'react-router-dom';
import { mergeFritekst, splittOppFritekst } from '../../utils/fritekstFunksjoner';
import { nesteSide, SkjemaSideProps, skjemaSteg } from './skjema-steg';
import { Knapp } from 'nav-frontend-knapper';

const Side2: FunctionComponent<SkjemaSideProps> = () => {
    const [datoFra, setDatoFra] = useState(new Date());

    const history = useHistory();
    const context = useContext(SkjemaContext);
    let aarsak = '';
    let yrker = '';
    let annet = '';
    if (context.skjema.fritekst) {
        const existerendeFelter = splittOppFritekst(context.skjema.fritekst);
        if (existerendeFelter.aarsak) {
            aarsak = existerendeFelter.aarsak;
        }
        if (existerendeFelter.yrker) {
            yrker = existerendeFelter.yrker;
        }
        if (existerendeFelter.annet) {
            annet = existerendeFelter.annet;
        }
    }
    const endreFritekstFelt = (key: string, value: string) => {
        const fritekstFelter: any = { aarsak, yrker, annet };
        fritekstFelter[key] = value;
        context.endreSkjemaVerdi('fritekst', mergeFritekst(fritekstFelter));
    };
    const steg = skjemaSteg(history.location.pathname);
    const nestePath = nesteSide(steg, context.skjema.id);
    const forrigePath = nesteSide(steg, context.skjema.id);
    return (
        <SkjemaRamme>
            <Sidetittel>Generelle opplysninger</Sidetittel>
            <div className={'skjema-innhold__side-2-text-area'}>
                <Textarea
                    label="Hva er årsaken til permitteringen"
                    value={aarsak}
                    maxLength={1000}
                    onChange={event => endreFritekstFelt('aarsak', event.currentTarget.value)}
                />
            </div>
            <div className={'skjema-innhold__side-2-text-area'}>
                <Textarea
                    label="Hvilke arbeidsgrupper (yrkeskategorier) tilhører de berørte"
                    value={yrker}
                    maxLength={1000}
                    onChange={event => endreFritekstFelt('yrker', event.currentTarget.value)}
                />
            </div>
            <div className={'skjema-innhold__side-2-dato-container'}>
                <Datovelger
                    value={context.skjema.startDato}
                    onChange={event => {
                        context.endreSkjemaVerdi('startDato', event.currentTarget.value);
                        setDatoFra(event.currentTarget.value);
                    }}
                    overtekst={'Fra'}
                />
                <div className={'skjema-innhold__dato-velger-til'}>
                    <Datovelger
                        value={context.skjema.sluttDato}
                        onChange={event => {
                            context.endreSkjemaVerdi('sluttDato', event.currentTarget.value);
                        }}
                        disabled={context.skjema.ukjentSluttDato}
                        overtekst={'Til'}
                        skalVareEtter={datoFra}
                    />
                    <Checkbox
                        label={'Ukjent slutt dato'}
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
            <div className={'skjema-innhold__side-2-text-area'}>
                <Textarea
                    label="Eventuelle andre opplysninger"
                    value={annet}
                    maxLength={1000}
                    onChange={event => endreFritekstFelt('annet', event.currentTarget.value)}
                />
            </div>
            <div className={'skjema-innhold__fram-og-tilbake'}>
                <Knapp
                    onClick={async () => {
                        await context.lagre();
                        history.push(forrigePath || '');
                    }}
                >
                    {' '}
                    Tilbake
                </Knapp>
                <Hovedknapp
                    onClick={async () => {
                        await context.lagre();
                        history.push(nestePath || '');
                    }}
                >
                    Videre
                </Hovedknapp>
            </div>
        </SkjemaRamme>
    );
};

export default Side2;
