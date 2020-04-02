import React, { useEffect, useState } from 'react';

import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';

export interface CheckAllBoxProps extends Partial<CheckboxProps> {
    rows: any[];
    setRows: (rows: any[]) => void;
    label?: string;
}

const CheckAllBox: React.FunctionComponent<CheckAllBoxProps> = props => {
    const { rows, setRows, label, onChange, checked, ...other } = props;
    const [checkAll, setCheckAll] = useState<boolean>(false);
    useEffect(() => {
        if (rows.length > 0) {
            setCheckAll(!rows.some((row: any) => !row.selected));
        } else {
            setCheckAll(false);
        }
    }, [rows]);

    const onCheckAllClicked = (): void => {
        const newRows = rows.map(row => ({
            ...row,
            selected: !checkAll,
        }));
        setCheckAll(!checkAll);
        setRows(newRows);
    };
    return (
        <Checkbox
            className="velg-alle-checkbox"
            label={label || 'Velg alle'}
            disabled={rows.length === 0}
            checked={checkAll}
            onChange={onCheckAllClicked}
            {...other}
        />
    );
};

export default CheckAllBox;
