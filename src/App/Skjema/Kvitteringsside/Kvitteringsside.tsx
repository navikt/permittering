import React, { useContext, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import KvitteringIkon from './KvitteringIkon';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import './Kvitteringsside.less';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederIkon from '../Side4-oppsummering/gjenstand.svg';
import Lenke from 'nav-frontend-lenker';
import SjekkOmFyltUt from '../../komponenter/SjekkOmFyltUt/SjekkOmFyltUt';
import {
    formatterDato,
    lagTekstBasertPaSkjemaType,
} from '../Side4-oppsummering/oppsummering-utils';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import { finnTittelBasertPaSkjemaType } from '../../Forside/SkjemaTabell/SkjemaTabell';

const Kvitteringsside = () => {
    const context = useContext(SkjemaContext);

    useEffect(() => {
        console.log();
        finnÅrsakstekst(context.skjema.årsakskode).then(setLesbarÅrsakskode);
    }, [context.skjema.årsakskode]);
    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const annet = existerendeFelter && existerendeFelter.annet ? existerendeFelter.annet : '';

    const sidetittel = finnTittelBasertPaSkjemaType(context.skjema.type);
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

    const sendtInnDato = context.skjema.sendtInnTidspunkt
        ? formatterDato(new Date(context.skjema.sendtInnTidspunkt))
        : '';

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname={'kvitteringside-container'}>
                <div className="kvitteringside__tekst">
                    <section className="kvitteringside">
                        <div className="kvitteringside__tittel-desktop">
                            <Systemtittel className="kvitteringside__systemtittel">
                                {sidetittel}
                            </Systemtittel>
                            <Undertittel>{'Skjema sendt inn ' + sendtInnDato}</Undertittel>
                        </div>
                        <Veilederpanel
                            type="plakat"
                            kompakt
                            fargetema="suksess"
                            svg={<KvitteringIkon />}
                        >
                            <Undertittel className="kvitteringside__tittel-mobil">
                                {sidetittel}
                            </Undertittel>
                            <div className="kvitteringside__boks kontaktinfo">
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
                            </div>
                            <div className="kvitteringside__boks kontaktinfo">
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
                            </div>

                            <div className="oppsummering__boks aarsak">
                                <Undertittel className="kvitteringside__tittel-mobil">
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
                            </div>

                            <div className="kvitteringside__boks yrkeskategorier">
                                <div className="tekst">
                                    <Normaltekst className="overskrift">
                                        Yrkeskategorier
                                    </Normaltekst>
                                    <SjekkOmFyltUt verdi={yrker} />
                                </div>
                            </div>

                            <div className="kvitteringside__boks varighet">
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
                            </div>

                            <div className="kvitteringside__boks andre-opplysninger">
                                <div className="tekst">
                                    <Normaltekst className="overskrift">
                                        Andre relevante opplysninger
                                    </Normaltekst>
                                    <Normaltekst>{annet}</Normaltekst>
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
