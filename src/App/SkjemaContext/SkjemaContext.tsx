import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { Permitteringsskjema } from "../../types/permitteringsskjema";
import { lagre, opprett } from "../../api/skjema-api";

type Context = {
  skjema: Permitteringsskjema;
  endreSkjemaVerdi: (felt: keyof Permitteringsskjema, verdi: any) => void;
  lagre: () => void;
};

const SkjemaContext = React.createContext<Context>({} as Context);

export const SkjemaProvider: FunctionComponent = props => {
  const [skjema, setSkjema] = useState<Permitteringsskjema>(
    {} as Permitteringsskjema
  );
  useEffect(() => {
    opprett("999999999").then(setSkjema);
  }, []);

  const context: Context = {
    endreSkjemaVerdi: (felt, verdi) => {
      setSkjema({ ...skjema, [felt]: verdi });
    },
    lagre: () => {
      lagre(skjema).then(setSkjema);
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
