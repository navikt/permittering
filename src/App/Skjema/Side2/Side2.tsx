import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'react-day-picker/lib/style.css';
import '../Skjema.less';
import './Side2.less';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Knapp } from 'nav-frontend-knapper';
import { Textarea } from 'nav-frontend-skjema';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import { Element } from 'nav-frontend-typografi';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import { forrigeSide, nesteSide, SkjemaSideProps, skjemaSteg } from '../skjema-steg';
import { mergeFritekst, splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import Datovelger from '../../komponenter/Datovelger/Datovelger';
import Banner from '../../HovedBanner/HovedBanner';
import { lagTekstBasertPaSkjemaType } from '../Side4-oppsummering/oppsummering-utils';

const Side2: FunctionComponent<SkjemaSideProps> = () => {
    const [datoFra, setDatoFra] = useState(new Date());
    const [datoTil, setDatoTil] = useState(undefined);

    const history = useHistory();
    const context = useContext(SkjemaContext);

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
    const endreFritekstFelt = (key: string, value: string) => {
        const fritekstFelter: any = { årsak, yrker, annet };
        fritekstFelter[key] = value;
        context.endreSkjemaVerdi('fritekst', mergeFritekst(fritekstFelter));
    };

    const steg = skjemaSteg(history.location.pathname);
    const nestePath = nesteSide(steg, context.skjema.id);
    const forrigePath = forrigeSide(steg, context.skjema.id);

    return (
        <>
            <Banner sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <Systemtittel>Generelle opplysninger</Systemtittel>
                <div className={'skjema-innhold__side-2-text-area'}>
                    <Textarea
                        label={lagTekstBasertPaSkjemaType(context.skjema.type)}
                        value={årsak}
                        maxLength={1000}
                        onChange={event => endreFritekstFelt('årsak', event.currentTarget.value)}
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
                <Element className={'skjema-innhold__side-2-dato-overskrift'}>
                    For hvilken periode gjelder dette?
                </Element>
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
                        label="Andre relevante opplysninger (frivillig)"
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
        </>
    );
};

export default Side2;
