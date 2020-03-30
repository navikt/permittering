import React, { FunctionComponent, useContext, useEffect } from 'react';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { SkjemaSideProps } from '../use-skjema-steg';
import { stillingstitlerPath } from '../../../paths.json';
import YrkeskategoriTabell from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger-gammel/YrkeskategoriTabell';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import { YrkeskategorivelgerGammel } from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger-gammel/Yrkeskategorivelger-gammel';

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
                <YrkeskategorivelgerGammel
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
