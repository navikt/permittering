import React from 'react';
import 'nav-frontend-tabell-style';
import { Arbeidsforhold, Refusjonsberegning } from '../../../types/refusjonsskjema';
import { getFnrReadableString } from '../../../utils/fnrFunksjoner';
import CheckAllBox from '../../komponenter/Skjema/CheckAllBox';
import CheckOneBox from '../../komponenter/Skjema/CheckOneBox';

interface ArbeidsforholdTabellProps {
    rows: Array<Arbeidsforhold>;
    setRows: (arbeidsforhold: Arbeidsforhold[]) => void;
    beregninger: Refusjonsberegning[];
}

// https://github.com/navikt/eessi-pensjon-ui/blob/master/src/components/TableSorter/TableSorter.tsx
const ArbeidsforholdTabell: React.FunctionComponent<ArbeidsforholdTabellProps> = ({
    rows,
    beregninger,
    setRows,
}) => {
    return (
        <table className="input-av-personer__tabell tabell">
            <thead>
                <tr>
                    <th className="kolonneheader-checkbox">
                        <CheckAllBox rows={rows} setRows={setRows} />
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Fnr
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Kjønn, alder
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Perm. grad
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Periode
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Innhentet inntekt
                    </th>
                    <th />
                    <th role="columnheader" aria-sort="none">
                        Beregnet refusjon
                    </th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => {
                    const beregning = beregninger.find(b => b.fnr === row.fnr);

                    return (
                        <tr key={'row' + row.fnr}>
                            <td>
                                <CheckOneBox row={row} rows={rows} setRows={setRows} />
                            </td>
                            <td>{row.fnr}</td>
                            <td>{getFnrReadableString(row.fnr)}</td>
                            <td>{row.gradering}</td>
                            <td>{row.periodeStart + ' - ' + row.periodeSlutt}</td>
                            <td>{beregning?.inntektInnhentet}</td>
                            <td>{beregning?.beregningsdetaljer.includes('SEKS_G') && '6G'}</td>
                            <td>{beregning?.refusjonsbeløp}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ArbeidsforholdTabell;
