import React, { FunctionComponent, useContext } from 'react';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import RefusjonContext from '../RefusjonContext';

const VelgBedrift: FunctionComponent = () => {
    const history = useHistory();
    const context = useContext(RefusjonContext);
    const opprettOgNavigerTilSkjema = async () => {
        const newId = await context.opprett({
            bedriftNr: '910825569',
            type: 'REFUSJONSKRAV_CORONOA',
        });
        history.push('/refusjon/generelt/' + newId);
    };
    return (
        <>
            <Dekorator sidetittel={'sadfsa'} />
            <HvitSideBoks>
                <Systemtittel>Velg Bedrift</Systemtittel>
                <br />
                <Hovedknapp onClick={opprettOgNavigerTilSkjema}>Gå til skjema</Hovedknapp>
            </HvitSideBoks>
        </>
    );
};
export default VelgBedrift;
