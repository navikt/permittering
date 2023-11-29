import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyShort, Button, Heading, Label, TextField } from '@navikt/ds-react';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { useSkjemaSteg } from '../use-skjema-steg';
import { erGyldigEpost, erGyldigTelefonNr } from '../../../utils/inputFeltValideringer';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import './Side1.css';
import Dekorator from '../../komponenter/Dekorator/Dekorator';

const Side1: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const navigate = useNavigate();
    const { steg, nesteSide } = useSkjemaSteg(context.skjema.id);
    const [feilMeldingEpost, setFeilmeldingEpost] = useState('');
    const [feilMeldingTelefonNr, setFeilmeldingTelefonNr] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('kontaktinformasjon');
    }, []);

    if (context.skjema.sendtInnTidspunkt) {
        navigate('/', { replace: true });
    }

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <Heading level="2" size="medium" spacing>
                    Kontaktinformasjon
                </Heading>
                <div className="skjema-innhold__side-1-seksjon">
                    <Heading level="3" size="small" spacing>
                        Informasjon om arbeidsgiver
                    </Heading>
                    <div className="skjema-innhold__side-1-felt__sbs">
                        <div className="skjema-innhold__side-1-felt">
                            <Label spacing>Virksomhetsnavn</Label>
                            <BodyShort size="small" spacing>
                                {context.skjema.bedriftNavn}
                            </BodyShort>
                        </div>
                        <div className="skjema-innhold__side-1-felt">
                            <Label spacing>Virksomhetsnummer</Label>
                            <BodyShort size="small" spacing>
                                {context.skjema.bedriftNr}
                            </BodyShort>
                        </div>
                    </div>
                </div>
                <div className="skjema-innhold__side-1-seksjon">
                    <Heading level="3" size="small" spacing>
                        Kontaktperson i virksomheten
                    </Heading>
                    <TextField
                        className="skjema-innhold__side-1-felt"
                        label="Navn"
                        defaultValue={context.skjema.kontaktNavn}
                        onChange={(event) =>
                            context.endreSkjemaVerdi('kontaktNavn', event.currentTarget.value)
                        }
                    />
                    <div className="skjema-innhold__side-1-felt__sbs">
                        <TextField
                            className="skjema-innhold__side-1-felt"
                            label="Telefonnummer"
                            defaultValue={context.skjema.kontaktTlf}
                            error={feilMeldingTelefonNr}
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
                                    setFeilmeldingTelefonNr(
                                        'Vennligst oppgi et gyldig telefonnummer'
                                    );
                            }}
                            onChange={() => setFeilmeldingTelefonNr('')}
                        />

                        <TextField
                            className={'skjema-innhold__side-1-felt'}
                            label="E-post"
                            defaultValue={context.skjema.kontaktEpost}
                            error={feilMeldingEpost}
                            onBlur={(event) => {
                                if (erGyldigEpost(event.currentTarget.value)) {
                                    context.endreSkjemaVerdi(
                                        'kontaktEpost',
                                        event.currentTarget.value
                                    );
                                    setFeilmeldingEpost('');
                                } else {
                                    setFeilmeldingEpost('Vennligst oppgi en gyldig e-post');
                                }
                            }}
                            onChange={() => setFeilmeldingEpost('')}
                        />
                    </div>
                </div>
                <div className="skjema-innhold__fram-og-tilbake">
                    <span>{/*hacks button to align right*/}</span>
                    <Button
                        onClick={async () => {
                            await context.lagre();
                            navigate(nesteSide);
                        }}
                    >
                        Neste
                    </Button>
                </div>
            </SkjemaRamme>
        </>
    );
};

export default Side1;
