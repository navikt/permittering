import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Heading, Label } from '@navikt/ds-react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { splittOppFritekst } from '../../../utils/fritekstFunksjoner';
import '../Side4-oppsummering/Oppsummering.css';
import KvitteringIkon from '../Kvitteringsside/KvitteringIkon';
import { lagTekstBasertPaSkjemaType } from '../Side4-oppsummering/oppsummering-utils';
import { lagAntallBerorteTekst } from '../Side4-oppsummering/Oppsummering';
import { finnÅrsakstekst } from '../../../api/kodeverksAPI';
import { formatDate } from '../../../utils/date-utils';

const OppsummeringKvittering: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const [lesbarÅrsakskode, setLesbarÅrsakskode] = useState<string | undefined>(undefined);

    const existerendeFelter = context.skjema.fritekst
        ? splittOppFritekst(context.skjema.fritekst)
        : null;
    const yrker = existerendeFelter && existerendeFelter.yrker ? existerendeFelter.yrker : '';

    const fraDato = context.skjema.startDato ? new Date(context.skjema.startDato) : undefined;
    const tilDato = context.skjema.sluttDato ? new Date(context.skjema.sluttDato) : undefined;

    useEffect(() => {
        finnÅrsakstekst(context.skjema.årsakskode).then(setLesbarÅrsakskode);
    }, [context.skjema.årsakskode]);

    return (
        <>
            <section className="oppsummering">
                <div className="oppsummering__tittel-desktop">
                    <Heading level="2" size="medium">
                        Kvittering på mottatt melding
                    </Heading>
                </div>
                <Veilederpanel type="plakat" kompakt fargetema="info" svg={KvitteringIkon()}>
                    <Heading level="3" size="small" className="oppsummering__tittel-mobil">
                        Oppsummering
                    </Heading>
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
                            <Label size="small" spacing>
                                Antall berørte:
                            </Label>
                            <div>
                                {context.skjema.antallBerørt}
                                {lagAntallBerorteTekst(context.skjema.antallBerørt)}
                            </div>
                        </div>
                    </div>

                    <div className="oppsummering__boks aarsak">
                        <Heading level="4" size="small" className="oppsummering__tittel-mobil">
                            Generelle opplysninger
                        </Heading>

                        <Label size="small" spacing>
                            {lagTekstBasertPaSkjemaType(context.skjema.type)}
                        </Label>
                        {lesbarÅrsakskode}
                    </div>

                    <div className="oppsummering__boks yrkeskategorier">
                        <Label size="small" spacing>
                            Yrkeskategorier
                        </Label>
                        {yrker}
                    </div>

                    <div className="oppsummering__boks varighet">
                        <Label size="small" spacing>
                            For hvilken periode gjelder dette?
                        </Label>
                        <div>
                            <span className="fra-til">Fra:</span>
                            {formatDate(fraDato)}
                        </div>
                        {context.skjema.type === 'PERMITTERING_UTEN_LØNN' && (
                            <div>
                                <span className="fra-til">Til:</span>
                                {context.skjema.ukjentSluttDato
                                    ? 'Vet ikke hvor lenge det vil vare'
                                    : formatDate(tilDato)}
                            </div>
                        )}
                    </div>
                </Veilederpanel>
            </section>
        </>
    );
};

export default OppsummeringKvittering;
