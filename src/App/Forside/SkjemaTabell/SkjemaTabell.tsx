import React from 'react';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import moment from 'moment';
import Lenke from 'nav-frontend-lenker';
import { loggTrykketPaTidligereSkjema } from '../../../utils/funksjonerForAmplitudeLogging';

interface SkjemaTabellProps {
    skjemaer: any;
}

const status = (skjema: Permitteringsskjema) => {
    if (skjema.sendtInnTidspunkt) {
        return 'Sendt inn';
    } else {
        return 'Påbegynt';
    }
};

export const finnTittelBasertPaSkjemaType = (type: Permitteringsskjema['type']) => {
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

const SkjemaTabell: React.FunctionComponent<SkjemaTabellProps> = ({ skjemaer }) => {
    return (
        <div>
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
                        <th role="columnheader" aria-sort="none"></th>
                    </tr>
                </thead>
                <tbody>
                    {skjemaer
                        .filter((skjema: Permitteringsskjema) => !skjema.avbrutt)
                        .map((skjema: Permitteringsskjema) => {
                            return (
                                <tr key={skjema.id}>
                                    <td>{finnTittelBasertPaSkjemaType(skjema.type)}</td>
                                    <td>
                                        {skjema.sendtInnTidspunkt &&
                                            moment(skjema.sendtInnTidspunkt).format('L')}
                                    </td>
                                    <td>{skjema.bedriftNr}</td>
                                    <td>{status(skjema)}</td>
                                    <td>
                                        <Lenke
                                            onClick={() =>
                                                loggTrykketPaTidligereSkjema(status(skjema))
                                            }
                                            href={
                                                '/permittering/skjema/kvitteringsside/' + skjema.id
                                            }
                                        >
                                            Gå til
                                        </Lenke>
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
