import React, { FunctionComponent } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { Select } from 'nav-frontend-skjema';

interface Props {
    organisasjoner: Array<Organisasjon>;
    setOrganisasjon: (orgnr: string) => void;
}

export const BedriftsVelger: FunctionComponent<Props> = props => {
    return (
        <Select
            className={'hva-skal-du-rapportere__bedriftsDropdown'}
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
    );
};
