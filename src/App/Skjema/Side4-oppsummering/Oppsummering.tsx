import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel, Undertittel, Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Feature, FeatureToggleContext } from '../../FeatureToggleProvider';
import environment from '../../../utils/environment';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { useSkjemaSteg } from '../use-skjema-steg';
import {
    loggAntallBerorte,
    loggArsak,
    loggBedriftsInfo,
    loggNavarendeSteg,
    loggProsentAndelPermittert,
    loggSkjemaInnsendt,
} from '../../../utils/funksjonerForAmplitudeLogging';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import { lagTekstBasertPaSkjemaType } from './oppsummering-utils';
import SjekkOmFyltUt from '../../komponenter/SjekkOmFyltUt/SjekkOmFyltUt';
import veilederIkon from './gjenstand.svg';
import './Oppsummering.less';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { status } from '../../Forside/SkjemaTabell/SkjemaTabell';
import AlertStripe from 'nav-frontend-alertstriper';
import dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export const lagAntallBerorteTekst = (antallBerorte?: number) => {
    if (antallBerorte) {
        return antallBerorte === 1 ? ' person' : ' personer';
    }
    return;
};

const Oppsummering: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const { organisasjoner } = useContext(OrganisasjonsListeContext);

    const [feilVedInnsending, setFeilVedInnsending] = useState(false);
    const [visFeilmeldingMangledeFelter, setVisFeilmeldingManglendeFelter] =
        useState<boolean>(false);
    const [manglendeFelter, setManglendeFelter] = useState<string[]>([]);

    const { steg, forrigeSide } = useSkjemaSteg(history.location.pathname, context.skjema.id);
    const featureToggleContext = useContext(FeatureToggleContext);
    const tillatFnrInput = featureToggleContext[Feature.tillatFnrInput];
    const [lesbarårsakskode, setLesbarÅrsakskode] = useState<string | undefined>(undefined);
    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const annet = existerendeFelter && existerendeFelter.annet ? existerendeFelter.annet : '';
    const [antallIBedrift, setAntallIBedrift] = useState('');

    useEffect(() => {
        finnÅrsakstekst(context.skjema.årsakskode).then(setLesbarÅrsakskode);
    }, [context.skjema.årsakskode]);

    const erGyldigDatoInput = (): boolean => {
        if (context.skjema.ukjentSluttDato) {
            return context.skjema.startDato !== '' && context.skjema.ukjentSluttDato;
        }
        if (context.skjema.sluttDato && context.skjema.startDato) {
            return dayjs(context.skjema.sluttDato, 'DD.MM.YYYY').isAfter(
                dayjs(context.skjema.startDato, 'DD.MM.YYYY')
            );
        }
        return false;
    };

    const fraDato = context.skjema.startDato ? context.skjema.startDato : '';
    const tilDato = context.skjema.sluttDato ? context.skjema.sluttDato : '';

    const endreantallberørteLenke = tillatFnrInput
        ? `/permittering/skjema/hvem-rammes/${context.skjema.id}`
        : `/permittering/skjema/generelle-opplysninger/${context.skjema.id}`;

    useEffect(() => {
        window.scrollTo(0, 0);
        const steg =
            status(context.skjema) === 'Sendt inn'
                ? 'oppsumeringsside innsendt'
                : 'oppsummeringsside';
        loggNavarendeSteg(steg);
    }, [context.skjema]);

    useEffect(() => {
        if (environment.MILJO === 'prod-gcp') {
            const fullBedrift = organisasjoner.filter(
                (org) => org.OrganizationNumber === context.skjema.bedriftNr
            )[0];
            fullBedrift &&
                loggBedriftsInfo(fullBedrift).then((antallAnsatte) =>
                    setAntallIBedrift(antallAnsatte)
                );
        }
    }, [organisasjoner, context.skjema.bedriftNr]);

    const onSendClickLogging = () => {
        const antallBerorte = context.skjema.antallBerørt ? context.skjema.antallBerørt : 0;
        const antallIBedriftInt = parseInt(antallIBedrift);
        if (antallBerorte > 0 && context.skjema.type && antallIBedriftInt > 0) {
            loggAntallBerorte(antallBerorte, context.skjema.type);
            loggProsentAndelPermittert(context.skjema.type, antallIBedriftInt, antallBerorte);
        }
        context.skjema.type && lesbarårsakskode && loggArsak(lesbarårsakskode, context.skjema.type);
    };

    if (context.skjema.sendtInnTidspunkt) {
        history.replace('/skjema/kvitteringsside/' + context.skjema.id);
    }

    const sjekkMangler = () => {
        let mangler: string[] = [];

        if (!context.skjema.kontaktNavn) {
            mangler.push('Navn på kontakperson er ikke fylt ut');
        }
        if (!context.skjema.kontaktTlf) {
            mangler.push('Telefonnummer er ikke fylt ut');
        }
        if (!context.skjema.kontaktEpost) {
            mangler.push('E-post er ikke fylt ut');
        }
        if (!context.skjema.antallBerørt) {
            mangler.push('Antall berørte er ikke fylt ut');
        }
        if (context.skjema.årsakskode !== 'ANDRE_ÅRSAKER') {
            if (!lesbarårsakskode) {
                mangler.push('Årsak er ikke fylt ut');
            }
        }
        if (context.skjema.årsakskode === 'ANDRE_ÅRSAKER') {
            if (!context.skjema.årsakstekst) {
                mangler.push('Årsak er ikke fylt ut');
            }
        }
        if (!yrker) {
            mangler.push('Yrkeskategorier er ikke fylt ut');
        }
        if (!erGyldigDatoInput()) {
            mangler.push('Ugyldig datoformat');
        }
        return mangler;
    };

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <section className="oppsummering">
                    <div className="oppsummering__tittel-desktop">
                        <Systemtittel>{'Er opplysningene riktige?'}</Systemtittel>
                    </div>
                    <Veilederpanel
                        type="plakat"
                        kompakt
                        fargetema="info"
                        svg={<img src={veilederIkon} alt="" aria-hidden="true" />}
                    >
                        <Undertittel className="oppsummering__tittel-mobil">
                            Oppsummering
                        </Undertittel>
                        <div className="oppsummering__boks kontaktinfo">
                            <table className="tabell">
                                <tbody>
                                    <tr>
                                        <th>Bedrift:</th>
                                        <td>{context.skjema.bedriftNavn}</td>
                                    </tr>
                                    <tr>
                                        <th>Bedriftsnummer:</th>
                                        <td>{context.skjema.bedriftNr}</td>
                                    </tr>
                                    <tr>
                                        <th>Kontaktperson:</th>
                                        <td>
                                            <SjekkOmFyltUt verdi={context.skjema.kontaktNavn} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Telefonnummer:</th>
                                        <td>
                                            <SjekkOmFyltUt verdi={context.skjema.kontaktTlf} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>E-post:</th>
                                        <td>
                                            <SjekkOmFyltUt verdi={context.skjema.kontaktEpost} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/kontaktinformasjon/${context.skjema.id}`}
                                    ariaLabel="Gå tilbake for å endre kontaktinformasjon"
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks antall-arbeidstakere">
                            <div className="tekst">
                                <Normaltekst className="overskrift">Antall berørte:</Normaltekst>
                                <div>
                                    <SjekkOmFyltUt verdi={context.skjema.antallBerørt} />
                                    {lagAntallBerorteTekst(context.skjema.antallBerørt)}
                                </div>
                            </div>
                            <div className="endre-lenke">
                                <Lenke
                                    href={endreantallberørteLenke}
                                    ariaLabel="Gå tilbake for å endre antall berørte personer"
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks aarsak">
                            <Undertittel className="oppsummering__tittel-mobil">
                                Generelle opplysninger
                            </Undertittel>
                            <div className="tekst">
                                <Normaltekst className="overskrift">
                                    {lagTekstBasertPaSkjemaType(context.skjema.type)}
                                </Normaltekst>
                                {context.skjema.årsakskode !== 'ANDRE_ÅRSAKER' && (
                                    <SjekkOmFyltUt verdi={lesbarårsakskode} />
                                )}
                                {context.skjema.årsakskode === 'ANDRE_ÅRSAKER' && (
                                    <SjekkOmFyltUt verdi={context.skjema.årsakstekst} />
                                )}
                            </div>

                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    ariaLabel="Gå tilbake for å endre årsak"
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks yrkeskategorier">
                            <div className="tekst">
                                <Normaltekst className="overskrift">Yrkeskategorier</Normaltekst>
                                <SjekkOmFyltUt verdi={yrker} />
                            </div>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    ariaLabel="Gå tilbake for å endre yrkeskategorier"
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks varighet">
                            <div className="tekst">
                                <Normaltekst className="overskrift">
                                    For hvilken periode gjelder dette?
                                </Normaltekst>
                                <div>
                                    <div>
                                        <span className="fra-til">Fra:</span>
                                        <SjekkOmFyltUt
                                            ugyldigInput={!erGyldigDatoInput()}
                                            verdi={fraDato}
                                        />
                                    </div>
                                    <div>
                                        <span className="fra-til">Til:</span>
                                        {context.skjema.ukjentSluttDato ? (
                                            'Vet ikke hvor lenge det vil vare'
                                        ) : (
                                            <SjekkOmFyltUt
                                                ugyldigInput={!erGyldigDatoInput()}
                                                verdi={tilDato}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    ariaLabel="Gå tilbake for å endre periode"
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks andre-opplysninger">
                            <div className="tekst">
                                <Normaltekst className="overskrift">
                                    Andre relevante opplysninger
                                </Normaltekst>
                                <Normaltekst>{annet}</Normaltekst>
                            </div>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    ariaLabel="Gå tilbake for å endre andre relevante opplysninger"
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>
                    </Veilederpanel>
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
                            id="send-inn-hovedknapp"
                            className="skjema-innhold__lagre"
                            onClick={async () => {
                                const thisKnapp = document.getElementById('send-inn-hovedknapp');
                                thisKnapp && thisKnapp.setAttribute('disabled', 'disabled');
                                const mangler = sjekkMangler();
                                setManglendeFelter(mangler);
                                if (mangler.length > 0) {
                                    setVisFeilmeldingManglendeFelter(true);
                                    return;
                                }
                                try {
                                    setVisFeilmeldingManglendeFelter(false);
                                    setManglendeFelter([]);
                                    await context.sendInn();
                                    history.push('/skjema/kvitteringsside/' + context.skjema.id);
                                    onSendClickLogging();
                                    loggSkjemaInnsendt();
                                    setFeilVedInnsending(false);
                                } catch (e) {
                                    if (e.response.status === 400) {
                                        setVisFeilmeldingManglendeFelter(true);
                                    } else {
                                        setFeilVedInnsending(true);
                                        thisKnapp?.removeAttribute('disabled');
                                    }
                                }
                            }}
                        >
                            Send til NAV
                        </Hovedknapp>
                    </div>
                    {feilVedInnsending && (
                        <AlertStripe
                            type={'feil'}
                            aria-live="polite"
                            className="oppsummering__alertstripe"
                        >
                            <Element>Noe gikk galt!</Element>
                            <Normaltekst>Prøv å sende inn skjemaet på nytt.</Normaltekst>
                        </AlertStripe>
                    )}
                    {visFeilmeldingMangledeFelter && (
                        <AlertStripe
                            type="feil"
                            className="oppsummering__alertstripe feilmelding-send-inn__tekst"
                            aria-live="polite"
                        >
                            <Normaltekst>
                                Du må fylle ut alle feltene.
                                <ul>
                                    {manglendeFelter.map((felt) => {
                                        return <li>{felt}</li>;
                                    })}
                                </ul>
                            </Normaltekst>
                        </AlertStripe>
                    )}
                </section>
            </SkjemaRamme>
        </>
    );
};

export default Oppsummering;
