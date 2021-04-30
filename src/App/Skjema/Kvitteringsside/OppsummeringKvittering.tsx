import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import '../Side4-oppsummering/Oppsummering.less';
import KvitteringIkon from '../Kvitteringsside/KvitteringIkon';
import {
    formatterDato,
    lagTekstBasertPaSkjemaType,
} from '../Side4-oppsummering/oppsummering-utils';
import { lagAntallBerorteTekst } from '../Side4-oppsummering/Oppsummering';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';

const OppsummeringKvittering: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const [lesbarÅrsakskode, setLesbarÅrsakskode] = useState<string | undefined>(undefined);

    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';
    const annet = existerendeFelter && existerendeFelter.annet ? existerendeFelter.annet : '';

    const fraDato = context.skjema.startDato
        ? formatterDato(new Date(context.skjema.startDato))
        : '';
    const tilDato = context.skjema.sluttDato
        ? formatterDato(new Date(context.skjema.sluttDato))
        : '';

    useEffect(() => {
        finnÅrsakstekst(context.skjema.årsakskode).then(setLesbarÅrsakskode);
    }, [context.skjema.årsakskode]);

    return (
        <>
            <section className="oppsummering">
                <div className="oppsummering__tittel-desktop">
                    <Systemtittel>Kvittering</Systemtittel>
                </div>
                <Veilederpanel type="plakat" kompakt fargetema="info" svg={KvitteringIkon()}>
                    <Undertittel className="oppsummering__tittel-mobil">Oppsummering</Undertittel>
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
                                    <td>{context.skjema.kontaktNavn}</td>
                                </tr>
                                <tr>
                                    <th>Telefonnummer:</th>
                                    <td>{context.skjema.kontaktTlf}</td>
                                </tr>
                                <tr>
                                    <th>E-post:</th>
                                    <td>{context.skjema.kontaktEpost}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="oppsummering__boks antall-arbeidstakere">
                        <div className="tekst">
                            <Normaltekst className="overskrift">Antall berørte:</Normaltekst>
                            <div>
                                {context.skjema.antallBerørt}
                                {lagAntallBerorteTekst(context.skjema.antallBerørt)}
                            </div>
                        </div>
                    </div>

                    <div className="oppsummering__boks aarsak">
                        <Undertittel className="oppsummering__tittel-mobil">
                            Generelle opplysninger
                        </Undertittel>
                        <Normaltekst className="overskrift">
                            {lagTekstBasertPaSkjemaType(context.skjema.type)}
                        </Normaltekst>
                        {lesbarÅrsakskode &&
                            context.skjema.årsakskode !== 'ANDRE_ÅRSAKER' &&
                            lesbarÅrsakskode}
                        {context.skjema.årsakskode === 'ANDRE_ÅRSAKER' &&
                            context.skjema.årsakstekst}
                    </div>

                    <div className="oppsummering__boks yrkeskategorier">
                        <div className="tekst">
                            <Normaltekst className="overskrift">Yrkeskategorier</Normaltekst>
                            {yrker}
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
                                    {fraDato}
                                </div>
                                <div>
                                    <span className="fra-til">Til:</span>
                                    {context.skjema.ukjentSluttDato
                                        ? 'Vet ikke hvor lenge det vil vare'
                                        : tilDato}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="oppsummering__boks andre-opplysninger">
                        <div className="tekst">
                            <Normaltekst className="overskrift">
                                Andre relevante opplysninger
                            </Normaltekst>
                            <Normaltekst>{annet}</Normaltekst>
                        </div>
                    </div>
                </Veilederpanel>
            </section>
        </>
    );
};

export default OppsummeringKvittering;
