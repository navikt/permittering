import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { OpprettSkjema, Permitteringsskjema } from '../../../types/permitteringsskjema';
import { avbryt, hent, lagre, opprett, sendInn } from '../../../api/permittering-api';

type Context = {
    skjema: Permitteringsskjema;
    endreSkjemaVerdi: (felt: keyof Permitteringsskjema, verdi: any) => void;
    endreFritekstOgVerdi: (
        felt: keyof Permitteringsskjema,
        verdi: any,
        fritekstVerdi: string
    ) => void;
    lagre: () => void;
    opprett: (data: OpprettSkjema) => Promise<Permitteringsskjema['id']>;
    sendInn: () => void;
    avbryt: () => void;
};

const SkjemaContext = React.createContext<Context>({} as Context);

export const SkjemaProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const [skjema, setSkjema] = useState<Permitteringsskjema>({} as Permitteringsskjema);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) {
            hent(id).then(setSkjema);
        }
    }, [id]);

    const context: Context = {
        endreSkjemaVerdi: (felt, verdi) => {
            setSkjema({ ...skjema, [felt]: verdi });
        },
        endreFritekstOgVerdi: (felt, verdi, fritekstVerdi) => {
            setSkjema({ ...skjema, [felt]: verdi, fritekst: fritekstVerdi });
        },
        lagre: async () => {
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
    return <SkjemaContext.Provider value={context}>{props.children}</SkjemaContext.Provider>;
};

// @ts-ignore
export default SkjemaContext;
