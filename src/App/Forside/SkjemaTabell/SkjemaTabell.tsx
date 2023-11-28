import React from 'react';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import { Link } from '@navikt/ds-react';
import { loggTrykketPaTidligereSkjema } from '../../../utils/funksjonerForAmplitudeLogging';
import {formatDate} from "../../../utils/date-utils";

interface SkjemaTabellProps {
    skjemaer: any;
}

export const status = (skjema: Permitteringsskjema) => {
    if (skjema.sendtInnTidspunkt) {
        return 'Sendt inn';
    } else {
        return 'Påbegynt';
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

    const redirectLenkeTilTidligereSkjema = (skjema: Permitteringsskjema) => {
        if (status(skjema) === 'Sendt inn') {
            return '/permittering/skjema/kvitteringsside/' + skjema.id;
        }
        if (status(skjema) === 'Påbegynt') {
            return '/permittering/skjema/kontaktinformasjon/' + skjema.id;
        }
        return '#';
    };

    return (
        <div>
            <table className="skjema__tabell tabell" aria-label="Dine skjema">
                <thead>
                    <tr>
                        <th role="columnheader" aria-sort="none">
                            Skjemaet gjelder
                        </th>
                        <th role="columnheader" aria-sort="none">
                            Dato sendt inn
                        </th>
                        <th role="columnheader" aria-sort="none">
                            Virksomhetsnummer
                        </th>

                        <th role="columnheader" aria-sort="none">
                            Status
                        </th>
                        <th role="columnheader" aria-sort="none">
                            Lenke til skjema
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {skjemaer
                        .filter((skjema: Permitteringsskjema) => !skjema.avbrutt)
                        .map((skjema: Permitteringsskjema) => {
                            return (
                                <tr key={skjema.id}>
                                    <td>{lagTekstBasertPaSkjemaType(skjema.type)}</td>
                                    <td>
                                        {skjema.sendtInnTidspunkt &&
                                            formatDate(new Date(skjema.sendtInnTidspunkt))}
                                    </td>
                                    <td>{skjema.bedriftNr}</td>
                                    <td>{status(skjema)}</td>
                                    <td>
                                        <Link
                                            onClick={() =>
                                                loggTrykketPaTidligereSkjema(status(skjema))
                                            }
                                            href={redirectLenkeTilTidligereSkjema(skjema)}
                                        >
                                            Gå til skjema
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
export default SkjemaTabell;
