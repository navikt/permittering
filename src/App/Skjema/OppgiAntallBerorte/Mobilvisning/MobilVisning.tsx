import React, { FunctionComponent } from 'react';

import './oversiktForMobil.less';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import TidligereInnsendtSkjema from '../../../Forside/oversiktForMobil/TidligereInnsendtSkjema/tidligereInnsendtSkjema';
import { InputfeltState } from '../OppgiAntallBerorte';

interface Props {
    listeMedOrganisasjoner: any;
    endreBedrift: (orgnr: string, antall: number, navn: string) => void;
    setInputfeltStates: (states: InputfeltState[]) => void;
    leggTilEllerFjernBedrift: (orgnr: string, navn: string) => void;
}

const MobilInputfelt: FunctionComponent<Props> = (props: Props) => {
    const rader = props.listeMedOrganisasjoner.map((skjema: Permitteringsskjema) => (
        <TidligereInnsendtSkjema key={skjema.id} tidligereSkjema={skjema} />
    ));

    return <div className={'forside__mobilvisning'}></div>;
};

export default MobilInputfelt;
