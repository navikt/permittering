import React, { FunctionComponent } from 'react';

import './oversiktForMobil.less';
import { erGyldigNr, InputfeltState } from '../OppgiAntallBerorte';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { Organisasjon } from '../../../../types/Organisasjon';
import Input from 'nav-frontend-skjema/lib/input';

interface Props {
    checked: boolean;
    setInputfeltStates: (states: InputfeltState[]) => void;
    inputFeltStatesKopi: InputfeltState[];
    leggTilEllerFjernBedrift: (orgnr: string, navn: string) => void;
    organisasjon: Organisasjon;
    endreBedrift: (orgnr: string, antall: number, navn: string) => void;
}

const OversiktForMobil: FunctionComponent<Props> = (props: Props) => {
    const indeksIinputfeltState: number = props.inputFeltStatesKopi.findIndex(
        (state: InputfeltState) => state.organisasjonsnr === props.organisasjon.OrganizationNumber
    );

    const gjeldendeState = props.inputFeltStatesKopi[indeksIinputfeltState];

    return (
        <div className={'forside__mobilvisning'}>
            <Checkbox
                label="Velg denne raden"
                checked={props.checked}
                onChange={() => {
                    props.inputFeltStatesKopi[indeksIinputfeltState].skalVises = !props.checked;
                    props.setInputfeltStates(props.inputFeltStatesKopi);
                    props.leggTilEllerFjernBedrift(
                        props.organisasjon.OrganizationNumber,
                        props.organisasjon.Name
                    );
                }}
            />
            <Input
                value={gjeldendeState.antall}
                feil={gjeldendeState.feilmelding}
                className={'hvem-berores__tabell-inputfelt'}
                placeholder={'Fyll inn antall'}
                id={'inputfelt-' + props.organisasjon.OrganizationNumber}
                onChange={(event: any) => {
                    if (
                        !erGyldigNr(event.currentTarget.value) &&
                        event.currentTarget.value !== ''
                    ) {
                        props.inputFeltStatesKopi[indeksIinputfeltState].feilmelding =
                            'Fyll inn antall';
                    } else {
                        props.inputFeltStatesKopi[indeksIinputfeltState].feilmelding = '';
                        props.endreBedrift(
                            props.organisasjon.OrganizationNumber,
                            parseInt(event.currentTarget.value),
                            props.organisasjon.Name
                        );
                    }
                    props.setInputfeltStates(props.inputFeltStatesKopi);
                }}
            />
        </div>
    );
};

export default OversiktForMobil;
