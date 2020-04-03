import React, { FunctionComponent } from 'react';

import './oversiktForMobil.less';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import TidligereInnsendtSkjema from './TidligereInnsendtSkjema/tidligereInnsendtSkjema';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    listeMedSkjema: any;
}

const OversiktForMobil: FunctionComponent<Props> = (props: Props) => {
    const rader = props.listeMedSkjema.map((skjema: Permitteringsskjema) => (
        <TidligereInnsendtSkjema key={skjema.id} tidligereSkjema={skjema} />
    ));

    return (
        <div className={'forside__mobilvisning'}>
            <Undertittel className={'forside__mobilvisning__undertittel'}>
                {' '}
                Dine skjema{' '}
            </Undertittel>
            {props.listeMedSkjema.length === 0 && (
                <Undertittel className={'forside__mobilvisning__undertittel'}>
                    <i>Ingen skjemaer</i>
                </Undertittel>
            )}
            <ul className={'forside__mobilvisning__ul'}>{rader}</ul>
        </div>
    );
};

export default OversiktForMobil;
