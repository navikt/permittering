import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { Checkbox } from 'nav-frontend-skjema';
// @ts-ignore
import validator from '@navikt/fnrvalidator';
import { Person } from '../../../../types/permitteringsskjema';

interface PersonTabellProps {
    personer: Array<Person>;
    setPersoner: (personer: Person[]) => void;
}

// Taes ut i egen fnr sak
const getAgeFromFnr = (fnr: string) => {
    const day = fnr.substring(0, 2);
    const month = fnr.substring(2, 4);
    const year = fnr.substring(4, 6);
    // @ts-ignore
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
// Taes ut i egen fnr sak
const isFnrWoman = (fnr: string) => {
    return parseInt(fnr.charAt(8)) % 2 === 0;
};
// Taes ut i egen fnr sak
const getFnrReadableString = (fnr: string) => {
    const result = validator.idnr(fnr);
    return (
        (isFnrWoman(fnr) ? 'Kvinne' : 'Mann') +
        ', ' +
        getAgeFromFnr(fnr) +
        ' år' +
        (result.type === 'dnr' ? ' (D)' : '')
    );
};

// https://github.com/navikt/eessi-pensjon-ui/blob/master/src/components/TableSorter/TableSorter.tsx
const PersonTabell: React.FunctionComponent<PersonTabellProps> = ({ personer, setPersoner }) => {
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const onCheckAllClicked = (): void => {
        const newItems: Person[] = personer.map(item => ({
            ...item,
            selected: !checkAll,
        }));
        setCheckAll(!checkAll);
        setPersoner(newItems);
    };

    const onCheckClicked = (changedItem: Person) => {
        const newItems: Person[] = personer.map(item => ({
            ...item,
            selected: changedItem.fnr === item.fnr ? !item.selected : item.selected,
        }));
        setPersoner(newItems);
        setCheckAll(false);
    };

    return (
        <table className="input-av-personer__tabell tabell">
            <thead>
                <tr>
                    <th className="kolonneheader-checkbox">
                        <Checkbox
                            className="velg-alle-checkbox"
                            label="Velg alle"
                            checked={checkAll}
                            onChange={onCheckAllClicked}
                        />
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
                                <Checkbox
                                    label="Velg denne raden"
                                    checked={!!person.selected}
                                    onChange={() => onCheckClicked(person)}
                                />
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