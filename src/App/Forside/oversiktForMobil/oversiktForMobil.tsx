import React, { FunctionComponent } from 'react';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import TidligereInnsendtSkjema from './TidligereInnsendtSkjema/tidligereInnsendtSkjema';
import './oversiktForMobil.css';

interface Props {
    listeMedSkjema: any;
}

const OversiktForMobil: FunctionComponent<Props> = (props: Props) => {
    const rader = props.listeMedSkjema.map((skjema: Permitteringsskjema) => (
        <TidligereInnsendtSkjema key={skjema.id} tidligereSkjema={skjema} />
    ));

    return (
        <div className="forside__mobilvisning">
            <Undertittel className="forside__mobilvisning__undertittel">Dine skjema</Undertittel>
            {props.listeMedSkjema ? (
                <ul className="forside__mobilvisning__ul" aria-label="Dine skjema">
                    {rader}
                </ul>
            ) : (
                <Ingress className="forside__mobilvisning__undertittel">
                    <i>Ingen skjemaer</i>
                </Ingress>
            )}
        </div>
    );
};

export default OversiktForMobil;
