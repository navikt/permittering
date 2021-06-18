import Select from 'nav-frontend-skjema/lib/select';
import React, { FunctionComponent, useEffect, useState } from 'react';
import hentAArsakskoder from '../../../api/kodeverksAPI';

interface Props {
    valgtårsak: string;
    setÅrsak: (årsak: string) => void;
    label: string;
}

export const Permitteringsårsaksvelger: FunctionComponent<Props> = (props) => {
    const [årsakskoder, setAArsakskoder] = useState({});

    useEffect(() => {
        hentAArsakskoder().then(setAArsakskoder);
    }, []);

    return (
        <Select
            label={props.label}
            onChange={(event) => {
                props.setÅrsak(event.target.value);
            }}
            defaultValue={'Velg en årsak'}
            value={props.valgtårsak}
        >
            <option key={'VELG_ÅRSAK'} value={'VELG_ÅRSAK'}>
                {'Velg årsak'}
            </option>
            {Object.entries<string>(årsakskoder).map((årsakskode) => {
                return (
                    <option key={årsakskode[0]} value={årsakskode[0]}>
                        {årsakskode[1]}
                    </option>
                );
            })}
        </Select>
    );
};
