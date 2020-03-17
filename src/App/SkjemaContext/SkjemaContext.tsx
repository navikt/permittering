import * as React from "react";
import {FunctionComponent, useEffect, useState} from "react";
import {Permitteringsskjema} from "../../types/permitteringsskjema";
import {hent, lagre, opprett} from "../../api/skjema-api";
import {useParams} from "react-router-dom"

type Context = {
  skjema: Permitteringsskjema;
  endreSkjemaVerdi: (felt: keyof Permitteringsskjema, verdi: any) => void;
  lagre: () => void;
  opprett: (orgnr: string, type: Permitteringsskjema["type"]) => void;
};

const SkjemaContext = React.createContext<Context>({} as Context);

export const SkjemaProvider: FunctionComponent = props => {
  const [skjema, setSkjema] = useState<Permitteringsskjema>(
      {} as Permitteringsskjema
  );
  let {id} = useParams()

  useEffect(() => {
    if (id) {
      hent(id).then(setSkjema)
    }
  }, [id]);

  const context: Context = {
    endreSkjemaVerdi: (felt, verdi) => {
      setSkjema({...skjema, [felt]: verdi});
    },
    lagre: async () => {
      await lagre(skjema).then(setSkjema);
    },
    opprett: async (orgnr: string, type: Permitteringsskjema["type"]) => {
      const skjema = await opprett(orgnr, type);
      setSkjema(skjema)
      return skjema.id
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
