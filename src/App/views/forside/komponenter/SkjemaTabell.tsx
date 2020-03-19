import React from 'react';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface SkjemaTabellProps {
    skjemaer: Permitteringsskjema[];
}

const SkjemaTabell: React.FunctionComponent<SkjemaTabellProps> = ({ skjemaer }) => {
    const lagTekstBasertPaSkjemaType = (type: string) => {
        switch (true) {
            case type === 'MASSEOPPSIGELSE':
                return 'Masseoppsigelse';
            case type === 'PERMITTERING_UTEN_LØNN':
                return 'Permittering uten lønn';
            case type === 'INNSKRENKNING_I_ARBEIDSTID':
                return 'Innskrenkning i arbeidstid';
        }
        return 'Ukjent';
    };

    return (
        <Normaltekst>
            <table className="skjema__tabell tabell">
                <thead>
                    <tr>
                        <th role="columnheader" aria-sort="none">
                            Skjemaet gjelder
                        </th>
                        <th role="columnheader" aria-sort="none">
                            Dato sendt inn
                        </th>
                        <th role="columnheader" aria-sort="none">
                            Bedriftsnummer
                        </th>

                        <th role="columnheader" aria-sort="none">
                            Status
                        </th>
                        <th role="columnheader" aria-sort="none">
                            Kontakt
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {skjemaer.map(skjema => {
                        return (
                            <tr key={skjema.id}>
                                <td>{lagTekstBasertPaSkjemaType(skjema.type)}</td>
                                <td>{moment(skjema.opprettetTidspunkt).format('lll')}</td>
                                <td>{skjema.bedriftNr}</td>
                                <td>
                                    {skjema.sendtInnTidspunkt
                                        ? 'Sendt inn ' +
                                          moment(skjema.sendtInnTidspunkt).format('lll')
                                        : 'Ikke sendt inn'}
                                </td>
                                <td>
                                    <Lenke
                                        href={
                                            '/permittering/skjema/kontaktinformasjon/' + skjema.id
                                        }
                                    >
                                        Kontaktinformasjon
                                    </Lenke>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Normaltekst>
    );
};
export default SkjemaTabell;
