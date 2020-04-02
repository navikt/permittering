import React, { FunctionComponent, useContext } from 'react';
import RefusjonContext from '../RefusjonContext';
import { useHistory } from 'react-router-dom';
import { useRefusjonSteg } from '../use-refusjon-steg';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { Systemtittel } from 'nav-frontend-typografi';
import Dekorator from '../../komponenter/Dekorator/Dekorator';

const Oppsummering: FunctionComponent = () => {
    const context = useContext(RefusjonContext);
    const history = useHistory();
    const { steg } = useRefusjonSteg(history.location.pathname, context.skjema.id);
    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <Systemtittel>Oppsummering</Systemtittel>
            </SkjemaRamme>
        </>
    );
};
export default Oppsummering;
