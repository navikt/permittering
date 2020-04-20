import React, { FunctionComponent } from 'react';
import { Organisasjon } from '../../../types/Organisasjon';
import { Select } from 'nav-frontend-skjema';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';

interface Props {
    label: string;
    organisasjoner: Array<Organisasjon>;
    setOrganisasjon: (org: string) => void;
    className?: string;
}

export const BedriftsVelger: FunctionComponent<Props> = props => {
    return (
        <div className={'enhetsvelger'}>
            <Select
                label={
                    <>
                        Hvilken juridisk enhet har underenheter som berøres?
                        <Normaltekst>
                            Du kan kun melde ifra for virksomheter som tilhører den samme juridiske
                            enheten
                        </Normaltekst>
                    </>
                }
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
