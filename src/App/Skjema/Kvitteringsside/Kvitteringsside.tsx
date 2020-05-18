import React, { useContext, useEffect, useState } from 'react';
import { Feilmelding, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import KvitteringIkon from './KvitteringIkon';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import {
    loggNavarendeSteg,
    loggSkjemaInnsendt,
} from '../../../utils/funksjonerForAmplitudeLogging';
import './Kvitteringsside.less';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederIkon from '../Side4-oppsummering/gjenstand.svg';
import Lenke from 'nav-frontend-lenker';
import SjekkOmFyltUt from '../../komponenter/SjekkOmFyltUt/SjekkOmFyltUt';
import {
    formatterDato,
    lagTekstBasertPaSkjemaType,
} from '../Side4-oppsummering/oppsummering-utils';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';

const Kvitteringsside = () => {
    const context = useContext(SkjemaContext);

    useEffect(() => {
        finnÅrsakstekst(context.skjema.årsakskode).then(setLesbarÅrsakskode);
    }, [context.skjema.årsakskode]);
    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const annet = existerendeFelter && existerendeFelter.annet ? existerendeFelter.annet : '';

    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser eller innskrenkning i arbeidstid';
    const [lesbarårsakskode, setLesbarÅrsakskode] = useState<string | undefined>(undefined);
    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('kvittering');
    }, []);

    const fraDato = context.skjema.startDato
        ? formatterDato(new Date(context.skjema.startDato))
        : '';
    const tilDato = context.skjema.sluttDato
        ? formatterDato(new Date(context.skjema.sluttDato))
        : '';

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname="kvitteringside">
                <div className="kvitteringside__ikon">
                    <KvitteringIkon />
                </div>
                <div className="kvitteringside__tekst">
                    <Systemtittel>Skjema er sendt til NAV</Systemtittel>
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
                                                <SjekkOmFyltUt
                                                    verdi={context.skjema.kontaktEpost}
                                                />
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
                                    <Normaltekst className="overskrift">
                                        Yrkeskategorier
                                    </Normaltekst>
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
                    </section>
                </div>
                <Lenkepanel
                    href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/"
                    border
                    tittelProps="normaltekst"
                >
                    Gå til Min side – arbeidsgiver
                </Lenkepanel>
                <Lenkepanel
                    href="https://www.nav.no/no/bedrift/innhold-til-bedrift-forside/nyheter/permitteringer-som-folge-av-koronaviruset"
                    border
                    tittelProps="normaltekst"
                >
                    Informasjon om permitteringer til arbeidsgivere i forbindelse med koronaviruset
                </Lenkepanel>
            </HvitSideBoks>
        </>
    );
};

export default Kvitteringsside;
