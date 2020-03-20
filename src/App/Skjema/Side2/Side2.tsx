import React, { FunctionComponent, useContext, useState } from 'react';
import '../Skjema.less';
import './Side2.less';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';

import { Textarea } from 'nav-frontend-skjema';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import 'react-day-picker/lib/style.css';

import { useHistory } from 'react-router-dom';

import { Knapp } from 'nav-frontend-knapper';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import { forrigeSide, nesteSide, SkjemaSideProps, skjemaSteg } from '../skjema-steg';
import { mergeFritekst, splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import Datovelger from '../../komponenter/Datovelger/Datovelger';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { Element } from 'nav-frontend-typografi';

const Side2: FunctionComponent<SkjemaSideProps> = () => {
    const [datoFra, setDatoFra] = useState(new Date());
    const [datoTil, setDatoTil] = useState(undefined);

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
    const forrigePath = forrigeSide(steg, context.skjema.id);

    const lagTekstBasertPaSkjemaType = () => {
        const type = context.skjema.type;
        switch (true) {
            case type === 'MASSEOPPSIGELSE':
                return 'Hva er årsaken til masseoppsigelsen';
            case type === 'PERMITTERING_UTEN_LØNN':
                return 'Hva er årsaken til massepermitteringen';
            case type === 'INNSKRENKNING_I_ARBEIDSTID':
                return 'Hva er årsaken til innskrenkningen';
        }
        return 'Hva er årsaken til permitteringen"';
    };

    return (
        <SkjemaRamme>
            <Systemtittel>Generelle opplysninger</Systemtittel>
            <div className={'skjema-innhold__side-2-text-area'}>
                <Textarea
                    label={lagTekstBasertPaSkjemaType()}
                    value={aarsak}
                    maxLength={1000}
                    onChange={event => endreFritekstFelt('aarsak', event.currentTarget.value)}
                />
            </div>
            <div className={'skjema-innhold__side-2-text-area'}>
                <Textarea
                    description="For eksempel kokk, sjåfør eller revisor"
                    label="Hvilke yrkeskategorier tilhører de berørte?"
                    value={yrker}
                    maxLength={1000}
                    onChange={event => endreFritekstFelt('yrker', event.currentTarget.value)}
                />
            </div>
            <Element>For hvilken periode gjelder dette?</Element>
            <div className={'skjema-innhold__side-2-dato-container'}>
                <Datovelger
                    value={context.skjema.startDato}
                    onChange={event => {
                        context.endreSkjemaVerdi('startDato', event.currentTarget.value);
                        setDatoFra(event.currentTarget.value);
                    }}
                    skalVareFoer={datoTil}
                    overtekst={'Fra:'}
                />
                <div className={'skjema-innhold__dato-velger-til'}>
                    <Datovelger
                        value={context.skjema.sluttDato}
                        onChange={event => {
                            context.endreSkjemaVerdi('sluttDato', event.currentTarget.value);
                            setDatoTil(event.currentTarget.value);
                        }}
                        disabled={context.skjema.ukjentSluttDato}
                        overtekst={'Til:'}
                        skalVareEtter={datoFra}
                    />
                    <Checkbox
                        label={'Vet ikke hvor lenge det vil vare'}
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
                    label="Andre relevante opplysninger"
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
                    Neste
                </Hovedknapp>
            </div>
        </SkjemaRamme>
    );
};

export default Side2;
