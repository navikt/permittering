import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Alert,
    BodyLong,
    BodyShort,
    Button,
    GuidePanel,
    Heading,
    Label,
    Link,
} from '@navikt/ds-react';
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
import './Oppsummering.css';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { status } from '../../Forside/SkjemaTabell/SkjemaTabell';
import { formatDate } from '../../../utils/date-utils';

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

    const { steg, forrigeSide } = useSkjemaSteg(context.skjema.id);
    const [lesbarårsakskode, setLesbarÅrsakskode] = useState<string | undefined>(undefined);
    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const [antallIBedrift, setAntallIBedrift] = useState('');

    if (context.skjema.sendtInnTidspunkt) {
        history.replace('/skjema/kvitteringsside/' + context.skjema.id);
    }

    useEffect(() => {
        finnÅrsakstekst(context.skjema.årsakskode).then(setLesbarÅrsakskode);
    }, [context.skjema.årsakskode]);

    const erGyldigDatoInput = (): boolean => {
        if (context.skjema.type !== 'PERMITTERING_UTEN_LØNN' && context.skjema.startDato) {
            return true;
        }
        if (context.skjema.ukjentSluttDato) {
            return context.skjema.startDato !== '' && context.skjema.ukjentSluttDato;
        }
        if (context.skjema.sluttDato && context.skjema.startDato) {
            return new Date(context.skjema.sluttDato) >= new Date(context.skjema.startDato);
        }
        return false;
    };

    const fraDato = context.skjema.startDato ? new Date(context.skjema.startDato) : undefined;
    const tilDato = context.skjema.sluttDato ? new Date(context.skjema.sluttDato) : undefined;

    const endreantallberørteLenke = `/permittering/skjema/generelle-opplysninger/${context.skjema.id}`;

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
        if (!lesbarårsakskode) {
            mangler.push('Årsak er ikke fylt ut');
        }
        if (!yrker) {
            mangler.push('Yrkeskategorier er ikke fylt ut');
        }
        if (!erGyldigDatoInput()) {
            mangler.push('Ugyldig datoformat');
        }
        return mangler;
    };

    console.log(context.skjema.startDato);

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
                        <Heading level="3" size="medium">
                            {'Er opplysningene riktige?'}
                        </Heading>
                    </div>
                    <GuidePanel
                        poster
                        illustration={<img src={veilederIkon} alt="" aria-hidden="true" />}
                    >
                        <Heading level="2" size="medium" className="oppsummering__tittel-mobil">
                            Oppsummering
                        </Heading>
                        <div className="oppsummering__boks kontaktinfo">
                            <table className="tabell">
                                <tbody>
                                    <tr>
                                        <th>Virksomhet:</th>
                                        <td>{context.skjema.bedriftNavn}</td>
                                    </tr>
                                    <tr>
                                        <th>Virksomhetsnummer:</th>
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
                                <Link
                                    href={`/permittering/skjema/kontaktinformasjon/${context.skjema.id}`}
                                    aria-label="Gå tilbake for å endre kontaktinformasjon"
                                >
                                    Endre
                                </Link>
                            </div>
                        </div>

                        <div className="oppsummering__boks antall-arbeidstakere">
                            <Label className="overskrift">Antall berørte:</Label>
                            <div>
                                <SjekkOmFyltUt verdi={context.skjema.antallBerørt} />
                                {lagAntallBerorteTekst(context.skjema.antallBerørt)}
                            </div>
                            <div className="endre-lenke">
                                <Link
                                    href={endreantallberørteLenke}
                                    aria-label="Gå tilbake for å endre antall berørte personer"
                                >
                                    Endre
                                </Link>
                            </div>
                        </div>

                        <div className="oppsummering__boks aarsak">
                            <Heading level="3" size="medium" className="oppsummering__tittel-mobil">
                                Generelle opplysninger
                            </Heading>
                            <Label className="overskrift">
                                {lagTekstBasertPaSkjemaType(context.skjema.type)}
                            </Label>
                            <SjekkOmFyltUt verdi={lesbarårsakskode} />

                            <div className="endre-lenke">
                                <Link
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    aria-label="Gå tilbake for å endre årsak"
                                >
                                    Endre
                                </Link>
                            </div>
                        </div>

                        <div className="oppsummering__boks yrkeskategorier">
                            <Label className="overskrift">Yrkeskategorier</Label>
                            <SjekkOmFyltUt verdi={yrker} />
                            <div className="endre-lenke">
                                <Link
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    aria-label="Gå tilbake for å endre yrkeskategorier"
                                >
                                    Endre
                                </Link>
                            </div>
                        </div>

                        <div className="oppsummering__boks varighet">
                            <Label className="overskrift">For hvilken periode gjelder dette?</Label>
                            <div>
                                <div>
                                    <span className="fra-til">Fra:</span>
                                    <SjekkOmFyltUt
                                        ugyldigInput={!erGyldigDatoInput()}
                                        verdi={formatDate(fraDato)}
                                    />
                                </div>
                                {context.skjema.type === 'PERMITTERING_UTEN_LØNN' && (
                                    <div>
                                        <span className="fra-til">Til:</span>
                                        {context.skjema.ukjentSluttDato ? (
                                            'Vet ikke hvor lenge det vil vare'
                                        ) : (
                                            <SjekkOmFyltUt
                                                ugyldigInput={!erGyldigDatoInput()}
                                                verdi={formatDate(tilDato)}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="endre-lenke">
                                <Link
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                    aria-label="Gå tilbake for å endre periode"
                                >
                                    Endre
                                </Link>
                            </div>
                        </div>
                    </GuidePanel>
                    <Alert
                        variant="info"
                        className="oppsummering__alertstripe feilmelding-send-inn__tekst"
                        aria-live="polite"
                    >
                        <BodyLong>
                            Alle med rettigheten "Innsyn i permittering- og nedbemanningsmeldinger
                            sendt til NAV" vil kunne se meldingen etter den er sendt inn.
                        </BodyLong>
                    </Alert>
                    <div className="skjema-innhold__fram-og-tilbake">
                        <Button
                            variant="tertiary"
                            onClick={async () => {
                                await context.lagre();
                                history.push(forrigeSide);
                            }}
                        >
                            Tilbake
                        </Button>

                        <Button
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
                                    // @ts-ignore TODO: fix typescript error
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
                        </Button>
                    </div>
                    {feilVedInnsending && (
                        <Alert
                            variant="error"
                            aria-live="polite"
                            className="oppsummering__alertstripe"
                        >
                            <Label>Noe gikk galt!</Label>
                            <BodyShort>Prøv å sende inn skjemaet på nytt.</BodyShort>
                        </Alert>
                    )}
                    {visFeilmeldingMangledeFelter && (
                        <Alert
                            variant="error"
                            className="oppsummering__alertstripe feilmelding-send-inn__tekst"
                            aria-live="polite"
                        >
                            <BodyShort>Du må fylle ut alle feltene.</BodyShort>
                            <ul>
                                {manglendeFelter.map((felt) => {
                                    return <li>{felt}</li>;
                                })}
                            </ul>
                        </Alert>
                    )}
                </section>
            </SkjemaRamme>
        </>
    );
};

export default Oppsummering;
