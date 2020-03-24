import React, { FunctionComponent, useContext } from 'react';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { SkjemaSideProps } from '../use-skjema-steg';
import { stillingstitlerPath } from '../../../paths.json';
import { Yrkeskategorivelger } from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger';
import YrkeskategoriTabell from './komponenter/YrkeskategoriTabell';
import Dekorator from '../../komponenter/Dekorator/Dekorator';

const Yrkeskategorier: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const [selected, setSelected] = React.useState<any>([]);
    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <Yrkeskategorivelger
                    searchPath={stillingstitlerPath}
                    selected={selected}
                    setSelected={setSelected}
                />
                <YrkeskategoriTabell selected={selected} setSelected={setSelected} />
            </SkjemaRamme>
        </>
    );
};

export default Yrkeskategorier;
