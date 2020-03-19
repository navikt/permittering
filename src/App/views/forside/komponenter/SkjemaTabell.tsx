import React from 'react';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface SkjemaTabellProps {
    skjemaer: Permitteringsskjema[];
}

const status = (skjema: Permitteringsskjema) => {
    if (skjema.avbrutt) {
        return 'Avbrutt';
    } else if (skjema.sendtInnTidspunkt) {
        return 'Sendt inn';
    } else {
        return 'Ikke sendt inn';
    }
};

const SkjemaTabell: React.FunctionComponent<SkjemaTabellProps> = ({ skjemaer }) => {
    const lagTekstBasertPaSkjemaType = (type: Permitteringsskjema['type']) => {
        switch (type) {
            case 'MASSEOPPSIGELSE':
                return 'Masseoppsigelse';
            case 'PERMITTERING_UTEN_LØNN':
                return 'Permittering uten lønn';
            case 'INNSKRENKNING_I_ARBEIDSTID':
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
                                <td>{status(skjema)}</td>
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
