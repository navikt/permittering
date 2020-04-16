import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { useSkjemaSteg } from '../use-skjema-steg';
import { erGyldigEpost, erGyldigTelefonNr } from '../../../utils/inputFeltValideringer';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import KontaktinfoIkon from './KontaktinfoIkon';
import './Kontaktinfo.less';

const Kontaktinfo: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const { steg, forrigeSide, nesteSide } = useSkjemaSteg(
        history.location.pathname,
        context.skjema.id
    );
    const [feilMeldingEpost, setFeilmeldingEpost] = useState('');
    const [feilMeldingTelefonNr, setFeilmeldingTelefonNr] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('kontaktinformasjon');
    }, []);
    if (context.skjema.sendtInnTidspunkt) {
        history.replace('/skjema/kvitteringsside');
    }
    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <Systemtittel className="skjema-innhold__kontaktinfo-tittel">
                    <KontaktinfoIkon />
                    Kontaktinformasjon
                </Systemtittel>

                <Normaltekst className="skjema-innhold__kontaktinfo-ingress">
                    Kontaktperson for dette varselet
                </Normaltekst>
                <Input
                    className="skjema-innhold__kontaktinfo-input-felt"
                    label="Navn"
                    defaultValue={context.skjema.kontaktNavn}
                    onChange={event =>
                        context.endreSkjemaVerdi('kontaktNavn', event.currentTarget.value)
                    }
                />
                <div className="skjema-innhold__kontaktinfo-linje-2">
                    <Input
                        className="skjema-innhold__kontaktinfo-input-felt"
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
                        className="skjema-innhold__kontaktinfo-input-felt"
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
                <div className="skjema-innhold__fram-og-tilbake">
                    <Knapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(forrigeSide);
                        }}
                    >
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
        </>
    );
};

export default Kontaktinfo;