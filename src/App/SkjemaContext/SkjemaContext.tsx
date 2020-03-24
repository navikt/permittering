import React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { OpprettSkjema, Permitteringsskjema } from '../../types/permitteringsskjema';
import { avbryt, hent, lagre, opprett, sendInn } from '../../api/skjema-api';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';

type Context = {
    skjema: Permitteringsskjema;
    endreSkjemaVerdi: (felt: keyof Permitteringsskjema, verdi: any) => void;
    lagre: () => void;
    opprett: (data: OpprettSkjema) => Promise<Permitteringsskjema['id']>;
    sendInn: () => void;
    avbryt: () => void;
};

const SkjemaContext = React.createContext<Context>({} as Context);

export const SkjemaProvider: FunctionComponent = props => {
    const [skjema, setSkjema] = useState<Permitteringsskjema>({} as Permitteringsskjema);
    const { id } = useParams();
    const featureToggleContext = useContext(FeatureToggleContext);
    const visskjema = featureToggleContext[Feature.visskjema];

    useEffect(() => {
        if (id) {
            hent(id).then(setSkjema);
        }
    }, [id]);

    const context: Context = {
        endreSkjemaVerdi: (felt, verdi) => {
            setSkjema({ ...skjema, [felt]: verdi });
        },
        lagre: async () => {
            skjema.antallBerørt =
                visfnrinput && skjema.personer
                    ? skjema.personer.length
                    : context.skjema.antallBerørt;
            skjema.varsletNavDato = new Date().toJSON();
            skjema.varsletAnsattDato = new Date().toJSON();
            await lagre(skjema).then(setSkjema);
        },
        opprett: async (data: OpprettSkjema) => {
            const skjema = await opprett(data);

            setSkjema(skjema);
            return skjema.id;
        },
        sendInn: async () => {
            await sendInn(skjema.id).then(setSkjema);
        },
        avbryt: async () => {
            await avbryt(skjema.id).then(setSkjema);
        },
        skjema,
    };
    return (
        <>
            {visskjema && (
                <SkjemaContext.Provider value={context}>{props.children}</SkjemaContext.Provider>
            )}
        </>
    );
};

// @ts-ignore
export default SkjemaContext;
