import React from 'react';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';

interface SkjemaTabellProps {
    skjemaer: Permitteringsskjema[];
}

const SkjemaTabell: React.FunctionComponent<SkjemaTabellProps> = ({ skjemaer }) => {
    if (skjemaer.length === 0) {
        return null;
    }

    return (
        <table className="skjema__tabell tabell">
            <thead>
                <tr>
                    <th role="columnheader" aria-sort="none">
                        Opprettet
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Bedriftsnummer
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Bedriftens navn
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Status
                    </th>
                    <th role="columnheader" aria-sort="none"></th>
                </tr>
            </thead>
            <tbody>
                {skjemaer.map(skjema => {
                    return (
                        <tr key={skjema.id}>
                            <td>{moment(skjema.opprettetTidspunkt).format('lll')}</td>
                            <td>{skjema.bedriftNr}</td>
                            <td>{skjema.bedriftNavn}</td>
                            <td>
                                {skjema.sendtInnTidspunkt
                                    ? 'Sendt inn ' + moment(skjema.sendtInnTidspunkt).format('lll')
                                    : 'Ikke sendt inn'}
                            </td>
                            <td>
                                <Lenke
                                    href={'/permittering/skjema/kontaktinformasjon/' + skjema.id}
                                >
                                    Gå til
                                </Lenke>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default SkjemaTabell;
