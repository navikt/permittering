import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import {
  OpprettSkjema,
  Permitteringsskjema
} from "../../types/permitteringsskjema";
import { hent, lagre, opprett, sendInn } from "../../api/skjema-api";
import { useParams } from "react-router-dom";

type Context = {
  skjema: Permitteringsskjema;
  endreSkjemaVerdi: (felt: keyof Permitteringsskjema, verdi: any) => void;
  lagre: () => void;
  opprett: (data: OpprettSkjema) => Promise<Permitteringsskjema["id"]>;
  sendInn: () => void;
};

const SkjemaContext = React.createContext<Context>({} as Context);

export const SkjemaProvider: FunctionComponent = props => {
  const [skjema, setSkjema] = useState<Permitteringsskjema>(
    {} as Permitteringsskjema
  );
  const { id } = useParams();

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
    skjema
  };

  return (
    <>
      <SkjemaContext.Provider value={context}>
        {props.children}
      </SkjemaContext.Provider>
    </>
  );
};

export default SkjemaContext;
