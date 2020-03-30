import React, { FunctionComponent, useContext, useEffect } from 'react';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { SkjemaSideProps } from '../use-skjema-steg';
import { stillingstitlerPath } from '../../../paths.json';
import { Yrkeskategorivelger } from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger';
import YrkeskategoriTabell from './komponenter/YrkeskategoriTabell';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';

const Yrkeskategorier: FunctionComponent<SkjemaSideProps> = () => {
    const context = useContext(SkjemaContext);
    const [selected, setSelected] = React.useState<any>([]);

    useEffect(() => {
        loggNavarendeSteg('yrkeskategorier');
    }, []);

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
