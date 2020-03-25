import React, { FunctionComponent, useContext, useState } from 'react';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import Input from 'nav-frontend-skjema/lib/input';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { useHistory } from 'react-router-dom';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import './Side1.less';
import { SkjemaSideProps, useSkjemaSteg } from '../use-skjema-steg';
import Banner from '../../HovedBanner/HovedBanner';
import { erGyldigEpost, erGyldigTelefonNr } from './inputFeltValideringer';

const Side1: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const { nesteSide } = useSkjemaSteg(history.location.pathname, context.skjema.id);
    const [feilMeldingEpost, setFeilmeldingEpost] = useState('');
    const [feilMeldingTelefonNr, setFeilmeldingTelefonNr] = useState('');

    return (
        <>
            <Banner sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <Systemtittel>Kontaktinformasjon</Systemtittel>
                <Undertittel className={'skjema-innhold__side-1-undertittel'}>
                    Informasjon om arbeidsgiver
                </Undertittel>

                <div className={'skjema-innhold__side-1-linje-2'}>
                    <Input
                        className={'skjema-innhold__side-1-input-felt'}
                        label="Bedriftens navn"
                        defaultValue={context.skjema.bedriftNavn}
                        disabled
                    />
                    <Input
                        className={'skjema-innhold__side-1-input-felt'}
                        label="Bedriftsnummer"
                        defaultValue={context.skjema.bedriftNr}
                        disabled
                    />
                </div>
                <Undertittel className={'skjema-innhold__side-1-undertittel'}>
                    Kontaktperson i virksomheten
                </Undertittel>
                <Input
                    className={'skjema-innhold__side-1-input-felt'}
                    label="Navn"
                    defaultValue={context.skjema.kontaktNavn}
                    onChange={event =>
                        context.endreSkjemaVerdi('kontaktNavn', event.currentTarget.value)
                    }
                />
                <div className={'skjema-innhold__side-1-linje-4'}>
                    <Input
                        className={'skjema-innhold__side-1-input-felt'}
                        label="Telefonnummer"
                        defaultValue={context.skjema.kontaktTlf}
                        feil={feilMeldingTelefonNr}
                        onBlur={(event: any) => {
                            if (erGyldigTelefonNr(event.currentTarget.value)) {
                                const telefonNummer = event.currentTarget.value;
                                const riktigFormat = telefonNummer.substr(
                                    telefonNummer.length - 8,
                                    telefonNummer.length
                                );
                                context.endreSkjemaVerdi('kontaktTlf', riktigFormat);
                                setFeilmeldingTelefonNr('');
                            } else
                                setFeilmeldingTelefonNr('Vennligst oppgi et gyldig telefonnummer');
                        }}
                        onChange={() => setFeilmeldingTelefonNr('')}
                    />
                    <Input
                        className={'skjema-innhold__side-1-input-felt'}
                        label="E-post"
                        defaultValue={context.skjema.kontaktEpost}
                        feil={feilMeldingEpost}
                        onBlur={event => {
                            if (erGyldigEpost(event.currentTarget.value)) {
                                context.endreSkjemaVerdi('kontaktEpost', event.currentTarget.value);
                                setFeilmeldingEpost('');
                            } else {
                                setFeilmeldingEpost('Vennligst oppgi en gyldig e-post');
                            }
                        }}
                        onChange={() => setFeilmeldingEpost('')}
                    />
                </div>
                <div className={'skjema-innhold__fram-og-tilbake'}>
                    &nbsp;
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
        </>
    );
};

export default Side1;
