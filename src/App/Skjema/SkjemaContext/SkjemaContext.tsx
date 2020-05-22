import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { OpprettSkjema, Permitteringsskjema } from '../../../types/permitteringsskjema';
import { avbryt, hent, lagre, opprett, sendInn } from '../../../api/permittering-api';
import { useParams } from 'react-router-dom';
import { Feature, FeatureToggleContext } from '../../FeatureToggleProvider';

type Context = {
    skjema: Permitteringsskjema;
    endreSkjemaVerdi: (felt: keyof Permitteringsskjema, verdi: any) => void;
    endreFritekstOgVerdi: (
        felt: keyof Permitteringsskjema,
        verdi: any,
        fritekstVerdi: string
    ) => void;
    endreJuridiskEnhet: (bedriftNr: string) => void;
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
    const tillatFnrInput = featureToggleContext[Feature.tillatFnrInput];
    useEffect(() => {
        if (id) {
            hent(id).then(setSkjema);
        }
    }, [id]);

    useEffect(() => {
        if (skjema.bedrifter && skjema.bedrifter.length > 0) {
            var antallBerørtskjema: number = 0;
            antallBerørtskjema = skjema.bedrifter.reduce(
                (sum: number, bedrift) => sum + bedrift.antall || 0,
                0
            );
            skjema.antallBerørt = antallBerørtskjema;
            console.log('antallberørte hook', antallBerørtskjema);
        }
    }, [skjema.bedrifter, skjema.antallBerørt]);

    const context: Context = {
        endreSkjemaVerdi: (felt, verdi) => {
            setSkjema({ ...skjema, [felt]: verdi });
        },
        endreJuridiskEnhet: (bedriftNr: string) => {
            setSkjema({ ...skjema, bedriftNr: bedriftNr, bedrifter: [] });
        },
        endreFritekstOgVerdi: (felt, verdi, fritekstVerdi) => {
            setSkjema({ ...skjema, [felt]: verdi, fritekst: fritekstVerdi });
        },
        lagre: async () => {
            if (tillatFnrInput) {
                skjema.antallBerørt = skjema.personer ? skjema.personer.length : 0;
            }
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
