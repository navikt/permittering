import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import Veilederpanel from 'nav-frontend-veilederpanel';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import { forrigeSide, SkjemaSideProps, skjemaSteg } from '../skjema-steg';
import veilederIkon from './gjenstand.svg';
import Banner from '../../HovedBanner/HovedBanner';
import { formatterDato, lagTekstBasertPaSkjemaType, lagTekstVarighet } from './oppsummering-utils';
import './Oppsummering.less';
import SjekkOmFyltUt from '../../komponenter/SjekkOmFyltUt/SjekkOmFyltUt';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

const Oppsummering: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const [feilmelding, setFeilmelding] = useState('');
    const steg = skjemaSteg(history.location.pathname);
    const forrigePath = forrigeSide(steg, context.skjema.id);

    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;

    const aarsak = existerendeFelter && existerendeFelter.aarsak ? existerendeFelter.aarsak : '';
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const annet = existerendeFelter && existerendeFelter.annet ? existerendeFelter.annet : '';
    const fraDato = context.skjema.startDato
        ? formatterDato(new Date(context.skjema.startDato))
        : '';
    const tilDato = context.skjema.sluttDato
        ? formatterDato(new Date(context.skjema.sluttDato))
        : '';

    return (
        <>
            <Banner sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <section className="oppsummering">
                    <div className="oppsummering__tittel">
                        <Systemtittel>Er opplysningene riktige?</Systemtittel>
                    </div>
                    <Veilederpanel
                        type="plakat"
                        kompakt
                        fargetema="info"
                        svg={<img src={veilederIkon} alt="" aria-hidden="true" />}
                    >
                        <div className="oppsummering__boks bedriftinfo">
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
                                </tbody>
                            </table>
                        </div>

                        <div className="oppsummering__boks kontaktinfo">
                            <table className="tabell">
                                <tbody>
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

                        <div className="oppsummering__boks aarsak">
                            <div className="tekst">
                                <Normaltekst className="overskrift">
                                    {lagTekstBasertPaSkjemaType(context.skjema.type)}
                                </Normaltekst>
                                <Normaltekst>
                                    <SjekkOmFyltUt verdi={aarsak} />
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

                        <div className="oppsummering__boks antall-arbeidstakere">
                            <table className="tabell">
                                <tbody>
                                    <tr>
                                        <th>Antall arbeidstakere som berøres:</th>
                                        <td>
                                            <SjekkOmFyltUt verdi={context.skjema.antallBerørt} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/hvem-rammes/${context.skjema.id}`}
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
                            <table className="tabell">
                                <tbody>
                                    <tr>
                                        <th>
                                            {lagTekstVarighet(
                                                context.skjema.type,
                                                'vil finne sted fra:'
                                            )}
                                        </th>
                                        <td>
                                            <SjekkOmFyltUt verdi={fraDato} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            {lagTekstVarighet(context.skjema.type, 'vil vare til:')}
                                        </th>
                                        <td>
                                            {context.skjema.ukjentSluttDato ? (
                                                'Vet ikke hvor lenge det vil vare'
                                            ) : (
                                                <SjekkOmFyltUt verdi={tilDato} />
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                history.push(forrigePath || '');
                            }}
                        >
                            Tilbake
                        </Knapp>
                        <div>
                            <Hovedknapp
                                className={'skjema-innhold__lagre'}
                                onClick={async () => {
                                    try {
                                        setFeilmelding('');
                                        await context.sendInn();
                                        history.push('/skjema/kvitteringsside');
                                    } catch (e) {
                                        if (e.response.status === 400) {
                                            setFeilmelding('Du må fylle ut alle feltene');
                                        }
                                    }
                                }}
                            >
                                Send til NAV
                            </Hovedknapp>
                            {feilmelding && (
                                <>
                                    <VerticalSpacer rem={0.5} />
                                    <b className="typo-feilmelding">{feilmelding}</b>
                                </>
                            )}
                            <br />
                        </div>
                    </div>
                </section>
            </SkjemaRamme>
        </>
    );
};

export default Oppsummering;
