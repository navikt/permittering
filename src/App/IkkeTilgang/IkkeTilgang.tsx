import { FunctionComponent } from 'react';
import React from 'react';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import { Undertittel } from 'nav-frontend-typografi';

const IkkeTilgang: FunctionComponent = props => {
    return (
        <HvitSideBoks>
            <Undertittel>
                Du har dessverre ikke tilgang til å fylle ut skjema om permittering
            </Undertittel>
            <br />
            <>
                For å fylle ut skjema kreves det at du har en rolle eller rettighet i bedriften i
                Altinn
            </>
        </HvitSideBoks>
    );
};
export default IkkeTilgang;
