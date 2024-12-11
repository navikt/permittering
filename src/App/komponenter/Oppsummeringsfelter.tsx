import { BodyShort, FormSummary, VStack } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { Permitteringsskjema } from '../../types/Permitteringsskjema';
import { formatDate } from '../../utils/date-utils';
import { headings, labels, sidetitler } from '../Skjema/Skjema';

const formatOrgNr = (orgNr: string) => orgNr.match(/.{1,3}/g)?.join(" ");

export const Oppsummeringsfelter: FunctionComponent<{
    tittel: string;
    skjema: Permitteringsskjema;
}> = ({ skjema, tittel }) => {
    const årsakstekstLabel = {
        PERMITTERING_UTEN_LØNN: 'Årsak til permittering',
        MASSEOPPSIGELSE: 'Årsak til masseoppsigelse',
        INNSKRENKNING_I_ARBEIDSTID: 'Årsak til innskrenkning i arbeidstid',
    };
    //

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    {tittel}
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Underenhet</FormSummary.Label>
                    <FormSummary.Value>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Navn</FormSummary.Label>
                                <FormSummary.Value>{skjema.bedriftNavn}</FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>Org.nr.</FormSummary.Label>
                                <FormSummary.Value>{formatOrgNr(skjema.bedriftNr)}</FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>Kontaktperson i virksomheten</FormSummary.Label>
                    <FormSummary.Value>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Navn</FormSummary.Label>
                                <FormSummary.Value>{skjema.kontaktNavn}</FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>E-post</FormSummary.Label>
                                <FormSummary.Value>{skjema.kontaktEpost}</FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>Telefon</FormSummary.Label>
                                <FormSummary.Value>{skjema.kontaktTlf}</FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>{headings[skjema.type]}</FormSummary.Label>
                    <FormSummary.Value>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Antall berørte</FormSummary.Label>
                                <FormSummary.Value>{skjema.antallBerørt}</FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    {årsakstekstLabel[skjema.type]}{' '}
                                </FormSummary.Label>
                                <FormSummary.Value>{skjema.årsakstekst}</FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>Berørte yrkeskategorier</FormSummary.Label>
                                <FormSummary.Value>
                                    {skjema.yrkeskategorier.map((i) => i.label).join(', ')}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    {labels[skjema.type].startDato}
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    {formatDate(skjema.startDato)}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                            {skjema.type === 'PERMITTERING_UTEN_LØNN' && (
                                <FormSummary.Answer>
                                    <FormSummary.Label>
                                        {labels[skjema.type].sluttDato}
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        {skjema.ukjentSluttDato
                                            ? labels[skjema.type].ukjentSluttDato
                                            : formatDate(skjema.sluttDato)}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            )}
                        </FormSummary.Answers>
                    </FormSummary.Value>
                </FormSummary.Answer>

                {skjema.sendtInnTidspunkt && (
                    <FormSummary.Answer>
                        <FormSummary.Label>Sendt inn til NAV</FormSummary.Label>
                        <FormSummary.Value>
                            {formatDate(skjema.sendtInnTidspunkt)}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};
