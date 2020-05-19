import React, { FunctionComponent } from 'react';

import { InputfeltState } from '../OppgiAntallBerorte';
import MobilInputfelt from './listeElementOrganisasjon';
import { Organisasjon } from '../../../../types/Organisasjon';

interface Props {
    listeMedOrganisasjoner: any;
    endreBedrift: (orgnr: string, antall: number, navn: string) => void;
    setInputfeltStates: (states: any) => void;
    inputfeltStates: InputfeltState[];
    leggTilEllerFjernBedrift: (orgnr: string, navn: string) => void;
    className?: string;
}

const MobilvisningAntallBerorte: FunctionComponent<Props> = (props: Props) => {
    const inputFeltStatesKopi = [...props.inputfeltStates];
    console.log('appen rendres');
    const rader = props.listeMedOrganisasjoner.map((org: Organisasjon) => (
        <MobilInputfelt
            key={org.OrganizationNumber}
            organisasjon={org}
            setInputfeltStates={props.setInputfeltStates}
            endreBedrift={props.endreBedrift}
            inputFeltStatesKopi={inputFeltStatesKopi}
            leggTilEllerFjernBedrift={props.leggTilEllerFjernBedrift}
        />
    ));

    return <div className={props.className}>{rader}</div>;
};

export default MobilvisningAntallBerorte;
