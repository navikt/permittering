import Select from 'nav-frontend-skjema/lib/select';
import React, { FunctionComponent, useEffect, useState } from 'react';
import hentAArsakskoder from '../../../api/kodeverksAPI';

interface Props {
    årsak: string;
    setÅrsak: (årsak: string) => void;
}

export const Permitteringsårsaksvelger: FunctionComponent<Props> = props => {
    const [aarsakskoder, setAArsakskoder] = useState({});
    useEffect(() => {
        hentAArsakskoder().then(setAArsakskoder);
    }, []);
    return (
        <Select
            label="Hvorfor skal dere permittere?"
            className={'hva-skal-du-rapportere__bedriftsDropdown'}
            onChange={event => {
                props.setÅrsak(event.target.value);
            }}
        >
            {Object.values<string>(aarsakskoder).map(årsakskode => {
                return (
                    <option key={årsakskode} value={årsakskode}>
                        {årsakskode}
                    </option>
                );
            })}
        </Select>
    );
};
