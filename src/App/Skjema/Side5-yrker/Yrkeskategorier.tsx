import React, { FunctionComponent, useContext, useEffect } from 'react';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { useSkjemaSteg } from '../use-skjema-steg';
import YrkeskategoriTabell from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger-gammel/YrkeskategoriTabell';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import { YrkeskategorivelgerGammel } from '../../komponenter/Yrkeskategorivelger/Yrkeskategorivelger-gammel/Yrkeskategorivelger-gammel';

const Yrkeskategorier: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const [selected, setSelected] = React.useState<any>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('yrkeskategorier');
    }, []);
    const { steg } = useSkjemaSteg(context.skjema.id);

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <YrkeskategorivelgerGammel
                    searchPath={'/permittering/api/stillingstitler'}
                    selected={selected}
                    setSelected={setSelected}
                />
                <YrkeskategoriTabell selected={selected} setSelected={setSelected} />
            </SkjemaRamme>
        </>
    );
};

export default Yrkeskategorier;
