import React from 'react';
import 'nav-frontend-tabell-style';
import { Person } from '../../../../types/permitteringsskjema';
import { getFnrReadableString } from '../../../../utils/fnrFunksjoner';
import CheckAllBox from '../../../komponenter/Skjema/CheckAllBox';
import CheckOneBox from '../../../komponenter/Skjema/CheckOneBox';

interface PersonTabellProps {
    personer: Array<Person>;
    setPersoner: (personer: Person[]) => void;
}

// https://github.com/navikt/eessi-pensjon-ui/blob/master/src/components/TableSorter/TableSorter.tsx
const PersonTabell: React.FunctionComponent<PersonTabellProps> = ({ personer, setPersoner }) => {
    return (
        <table className="input-av-personer__tabell tabell">
            <thead>
                <tr>
                    <th className="kolonneheader-checkbox">
                        <CheckAllBox rows={personer} setRows={setPersoner} />
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Fødselsnummer
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Kjønn og alder
                    </th>
                </tr>
            </thead>
            <tbody>
                {personer.map(person => {
                    return (
                        <tr key={'row' + person.fnr}>
                            <td>
                                <CheckOneBox rows={personer} setRows={setPersoner} row={person} />
                            </td>
                            <td>{person.fnr}</td>
                            <td>{getFnrReadableString(person.fnr)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default PersonTabell;
