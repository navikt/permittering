import React, {Dispatch, SetStateAction, useState} from "react";
import 'nav-frontend-tabell-style';
import {Checkbox} from "nav-frontend-skjema";
// @ts-ignore
import validator from '@navikt/fnrvalidator';

interface PersonTabellProps {
    personer: Array<PersonObject>;
    setPersoner: Dispatch<SetStateAction<any[]>>;
}

interface PersonObject {
    fnr: string,
    grad?: number,
    kommentar?: string,
    selected?: boolean,
}

// Taes ut i egen fnr sak
const getAgeFromFnr = (fnr: string) => {
    const day = fnr.substring(0, 2)
    const month = fnr.substring(2, 4)
    const year = fnr.substring(4, 6)
    // @ts-ignore
    const birthDate = new Date(year, month - 1, day)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
// Taes ut i egen fnr sak
const isFnrWoman = (fnr: string) => {
    return parseInt(fnr.substring(8, 9)) % 2
}
// Taes ut i egen fnr sak
const getFnrReadableString = (fnr: string) => {
    const result = validator.idnr(fnr)
    return (isFnrWoman(fnr) ? "Kvinne" : "Mann") + ", "
        + getAgeFromFnr(fnr) + " år"
        + ((result.type === "dnr") ? " (D)" : "")
}

// https://github.com/navikt/eessi-pensjon-ui/blob/master/src/components/TableSorter/TableSorter.tsx
const PersonTabell: React.FunctionComponent<PersonTabellProps> = ({personer, setPersoner}) => {
    const [checkAll, setCheckAll] = useState<boolean>(false)
    const onCheckAllClicked = (): void => {
        const newItems: PersonObject[] = personer.map(item => ({
            ...item,
            selected: !checkAll
        }))
        setCheckAll(!checkAll)
        setPersoner(newItems)
    }

    const onCheckClicked = (changedItem: PersonObject) => {
        const newItems: PersonObject[] = personer.map(item => ({
            ...item,
            selected: changedItem.fnr === item.fnr ? !item.selected : item.selected
        }))
        setPersoner(newItems)
        setCheckAll(false)
    }

    return (
        <table className="tabell">
            <thead>
            <tr>
                <th><Checkbox label="Velg alle"
                              checked={checkAll}
                              onChange={onCheckAllClicked}
                /></th>
                <th role="columnheader" aria-sort="none">Fødselsnummer</th>
                <th role="columnheader" aria-sort="none">Identifikasjon</th>
            </tr>
            </thead>
            <tbody>
            {
                personer.map(person => {
                    return (<tr key={"row" + person.fnr}>
                        <td><Checkbox label="Velg denne raden"
                                      checked={!!person.selected}
                                      onChange={() => onCheckClicked(person)}
                        /></td>
                        <td>{person.fnr}</td>
                        <td>{getFnrReadableString(person.fnr)}</td>
                    </tr>)
                })
            }
            </tbody>
        </table>
    );
};

export default PersonTabell;
