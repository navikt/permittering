import React, {FunctionComponent} from 'react';
import {BodyLong, Heading} from '@navikt/ds-react';
import {Permitteringsskjema} from '../../../types/permitteringsskjema';
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
            <Heading level="3" size="small" className="forside__mobilvisning__undertittel">
                Dine skjema
            </Heading>
            {props.listeMedSkjema ? (
                <ul className="forside__mobilvisning__ul" aria-label="Dine skjema">
                    {rader}
                </ul>
            ) : (
                <BodyLong size="large" className="forside__mobilvisning__undertittel">
                    <em>Ingen skjemaer</em>
                </BodyLong>
            )}
        </div>
    );
};

export default OversiktForMobil;
