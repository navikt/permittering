import React, { FunctionComponent, useEffect, useState } from 'react';
import { avbryt, hent, lagre, opprett, sendInn } from '../../api/refusjon-api';
import { useParams } from 'react-router-dom';
import { OpprettRefusjon, Refusjonsskjema } from '../../types/refusjonsskjema';
import { RouteParams } from '../Skjema/PermitteringRoutes';

type ContextType = {
    skjema: Refusjonsskjema;
    endreSkjemaVerdi: (felt: keyof Refusjonsskjema, verdi: any) => void;
    lagre: () => void;
    opprett: (data: OpprettRefusjon) => Promise<Refusjonsskjema['id']>;
    sendInn: () => void;
    avbryt: () => void;
};

const RefusjonContext = React.createContext<ContextType>({} as ContextType);

export const RefusjonProvider: FunctionComponent = props => {
    const [skjema, setSkjema] = useState<Refusjonsskjema>({} as Refusjonsskjema);
    const { id } = useParams<RouteParams>();

    useEffect(() => {
        if (id) {
            hent(id).then(setSkjema);
        }
    }, [id]);

    const context: ContextType = {
        endreSkjemaVerdi: (felt, verdi) => {
            setSkjema({ ...skjema, [felt]: verdi });
        },
        lagre: async () => {
            await lagre(skjema).then(setSkjema);
        },
        opprett: async (data: OpprettRefusjon) => {
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
            <RefusjonContext.Provider value={context}>{props.children}</RefusjonContext.Provider>
        </>
    );
};

// @ts-ignore
export default RefusjonContext;
