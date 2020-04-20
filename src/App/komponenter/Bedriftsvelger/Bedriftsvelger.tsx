import React, { FunctionComponent } from 'react';
import { Organisasjon } from '../../../types/Organisasjon';
import { Select } from 'nav-frontend-skjema';

interface Props {
    label: React.ReactNode;
    organisasjoner: Array<Organisasjon>;
    setOrganisasjon: (org: string) => void;
}

export const BedriftsVelger: FunctionComponent<Props> = props => {
    return (
        <div className="enhetsvelger">
            <Select
                label={props.label}
                onChange={event => {
                    props.setOrganisasjon(event.target.value);
                }}
            >
                {props.organisasjoner.map(organisasjon => {
                    return (
                        <option
                            key={organisasjon.OrganizationNumber}
                            value={organisasjon.OrganizationNumber}
                        >
                            {organisasjon.Name} - {organisasjon.OrganizationNumber}
                        </option>
                    );
                })}
            </Select>
        </div>
    );
};
