import React from 'react';

import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';

export interface CheckOneBoxProps extends Partial<CheckboxProps> {
    row: any;
    rows: any[];
    setRows: (rows: any[]) => void;
    label?: string;
}

const CheckOneBox: React.FunctionComponent<CheckOneBoxProps> = props => {
    const { row, rows, setRows, label, onChange, checked, ...other } = props;
    const onCheckClicked = (changedKey: string) => {
        const newItems = rows.map(item => ({
            ...item,
            selected: changedKey === item.fnr ? !item.selected : item.selected,
        }));
        setRows(newItems);
    };
    return (
        <Checkbox
            label="Velg denne raden"
            checked={!!row.selected}
            onChange={() => onCheckClicked(row.fnr)}
            {...other}
        />
    );
};

export default CheckOneBox;
