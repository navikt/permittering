import React, { FunctionComponent } from 'react';

import './oversiktForMobil.less';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import TidligereInnsendtSkjema from './TidligereInnsendtSkjema/tidligereInnsendtSkjema';

interface Props {
    className?: string;
    listeMedSkjema: Permitteringsskjema[];
}

const OversiktForMobil: FunctionComponent<Props> = (props: Props) => {
    const rader = props.listeMedSkjema.map(skjema => (
        <TidligereInnsendtSkjema key={skjema.id} tidligereSkjema={skjema} />
    ));

    return <ul className={props.className}>{rader}</ul>;
};

export default OversiktForMobil;
