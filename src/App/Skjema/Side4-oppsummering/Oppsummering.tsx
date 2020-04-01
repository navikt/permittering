import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Feilmelding, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { Feature, FeatureToggleContext } from '../../FeatureToggleProvider';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import { SkjemaSideProps, useSkjemaSteg } from '../use-skjema-steg';
import {
    loggAntallBerorte,
    loggBedriftsInfo,
    loggNavarendeSteg,
    loggProsentAndelPermittert,
    loggSkjemaInnsendt,
} from '../../../utils/funksjonerForAmplitudeLogging';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import Banner from '../../HovedBanner/HovedBanner';
import { formatterDato, lagTekstBasertPaSkjemaType } from './oppsummering-utils';
import SjekkOmFyltUt from '../../komponenter/SjekkOmFyltUt/SjekkOmFyltUt';
import veilederIkon from './gjenstand.svg';
import './Oppsummering.less';
import environment from '../../../utils/environment';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';

const Oppsummering: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const history = useHistory();
    const [feilmelding, setFeilmelding] = useState('');
    const { forrigeSide } = useSkjemaSteg(history.location.pathname, context.skjema.id);
    const featureToggleContext = useContext(FeatureToggleContext);
    const tillatFnrInput = featureToggleContext[Feature.tillatFnrInput];
    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const årsak = existerendeFelter && existerendeFelter.årsak ? existerendeFelter.årsak : '';
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const annet = existerendeFelter && existerendeFelter.annet ? existerendeFelter.annet : '';

    const [antallIBedrift, setAntallIBedrift] = useState('');

    useEffect(() => {
        if (environment.MILJO === 'prod-sbs') {
            const fullBedrift = organisasjoner.filter(
                org => org.OrganizationNumber === context.skjema.bedriftNr
            )[0];
            fullBedrift &&
                loggBedriftsInfo(fullBedrift).then(antallAnsatte =>
                    setAntallIBedrift(antallAnsatte)
                );
        }
    }, [organisasjoner, context.skjema.bedriftNr]);

    const lagAntallBerorteTekst = () => {
        if (context.skjema.antallBerørt) {
            return context.skjema.antallBerørt === 1 ? ' person' : ' personer';
        }
        return;
    };

    const fraDato = context.skjema.startDato
        ? formatterDato(new Date(context.skjema.startDato))
        : '';
    const tilDato = context.skjema.sluttDato
        ? formatterDato(new Date(context.skjema.sluttDato))
        : '';

    const endreantallberørteLenke = tillatFnrInput
        ? `/permittering/skjema/hvem-rammes/${context.skjema.id}`
        : `/permittering/skjema/generelle-opplysninger/${context.skjema.id}`;

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('oppsummeringsside');
    }, []);

    const onSendClickLogging = () => {
        const antallBerorte = context.skjema.antallBerørt ? context.skjema.antallBerørt : 0;
        const antallIBedriftInt = parseInt(antallIBedrift);
        if (antallBerorte > 0 && context.skjema.type && antallIBedriftInt > 0) {
            loggAntallBerorte(antallBerorte, context.skjema.type);
            loggProsentAndelPermittert(context.skjema.type, antallIBedriftInt, antallBerorte);
        }
    };

    return (
        <>
            <Banner sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <section className="oppsummering">
                    <div className="oppsummering__tittel-desktop">
                        <Systemtittel>Er opplysningene riktige?</Systemtittel>
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
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks antall-arbeidstakere">
                            <div className="tekst">
                                <Normaltekst className="overskrift">Antall berørte:</Normaltekst>
                                <Normaltekst>
                                    <SjekkOmFyltUt verdi={context.skjema.antallBerørt} />
                                    {lagAntallBerorteTekst()}
                                </Normaltekst>
                            </div>
                            <div className="endre-lenke">
                                <Lenke href={endreantallberørteLenke}>Endre</Lenke>
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
                                <Normaltekst>
                                    <SjekkOmFyltUt verdi={årsak} />
                                </Normaltekst>
                            </div>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
                                >
                                    Endre
                                </Lenke>
                            </div>
                        </div>

                        <div className="oppsummering__boks yrkeskategorier">
                            <div className="tekst">
                                <Normaltekst className="overskrift">
                                    Hvilke yrkeskategorier tilhører de berørte?
                                </Normaltekst>
                                <Normaltekst>
                                    <SjekkOmFyltUt verdi={yrker} />
                                </Normaltekst>
                            </div>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
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
                                    <Normaltekst>
                                        <span className="fra-til">Fra:</span>
                                        <SjekkOmFyltUt verdi={fraDato} />
                                    </Normaltekst>
                                    <Normaltekst>
                                        <span className="fra-til">Til:</span>
                                        {context.skjema.ukjentSluttDato ? (
                                            'Vet ikke hvor lenge det vil vare'
                                        ) : (
                                            <SjekkOmFyltUt verdi={tilDato} />
                                        )}
                                    </Normaltekst>
                                </div>
                            </div>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/generelle-opplysninger/${context.skjema.id}`}
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
                            className="skjema-innhold__lagre"
                            onClick={async () => {
                                onSendClickLogging();
                                try {
                                    setFeilmelding('');
                                    await context.sendInn();
                                    history.push('/skjema/kvitteringsside');
                                    loggSkjemaInnsendt();
                                } catch (e) {
                                    if (e.response.status === 400) {
                                        setFeilmelding('Du må fylle ut alle feltene');
                                    }
                                }
                            }}
                        >
                            Send til NAV
                        </Hovedknapp>
                    </div>
                    {feilmelding && (
                        <div className="feilmelding-send-inn">
                            <Feilmelding>{feilmelding}</Feilmelding>
                        </div>
                    )}
                </section>
            </SkjemaRamme>
        </>
    );
};

export default Oppsummering;
