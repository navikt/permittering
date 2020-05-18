import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Feilmelding, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
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
import { formatterDato, lagTekstBasertPaSkjemaType } from './oppsummering-utils';
import SjekkOmFyltUt from '../../komponenter/SjekkOmFyltUt/SjekkOmFyltUt';
import veilederIkon from './gjenstand.svg';
import './Oppsummering.less';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import Dekorator from '../../komponenter/Dekorator/Dekorator';

const Oppsummering: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const [feilmelding, setFeilmelding] = useState('');
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

    const onSendClickLogging = () => {
        console.log('on send logging');
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
                                        <th>Berørte virksomheter:</th>
                                        <th>Antall berørte ansatte:</th>
                                    </tr>
                                    {context.skjema.bedrifter?.map(org => {
                                        return (
                                            <tr>
                                                <td>
                                                    {org.navn}({org.bedriftsnr})
                                                </td>{' '}
                                                <td>{org.antall}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="endre-lenke">
                                <Lenke
                                    href={`/permittering/skjema/antall-berorte/${context.skjema.id}`}
                                >
                                    Endre
                                </Lenke>
                            </div>
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

                        <div className="oppsummering__boks antall-arbeidstakere">
                            <div className="tekst">
                                <Normaltekst className="overskrift">Antall berørte:</Normaltekst>
                                <div>
                                    <SjekkOmFyltUt verdi={context.skjema.antallBerørt} />
                                    {lagAntallBerorteTekst()}
                                </div>
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
                                        <SjekkOmFyltUt verdi={fraDato} />
                                    </div>
                                    <div>
                                        <span className="fra-til">Til:</span>
                                        {context.skjema.ukjentSluttDato ? (
                                            'Vet ikke hvor lenge det vil vare'
                                        ) : (
                                            <SjekkOmFyltUt verdi={tilDato} />
                                        )}
                                    </div>
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
                                try {
                                    setFeilmelding('');
                                    await context.sendInn();
                                    history.push('/skjema/kvitteringsside/' + context.skjema.id);
                                    onSendClickLogging();
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
