import React, { FunctionComponent } from 'react';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import { Undertittel } from 'nav-frontend-typografi';
import { BrodsmuleSti } from '../komponenter/BrodsmuleSti/BrodsmuleSti';

const IkkeTilgang: FunctionComponent = () => {
    return (
        <HvitSideBoks>
            <BrodsmuleSti />
            <Undertittel>
                Du har dessverre ikke tilgang til å fylle ut skjema om permittering
            </Undertittel>
            <p>
                For å fylle ut skjema kreves det at du har en rolle eller rettighet i bedriften i
                Altinn
            </p>
        </HvitSideBoks>
    );
};
export default IkkeTilgang;
