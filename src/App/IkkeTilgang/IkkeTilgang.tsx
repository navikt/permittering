import React, { FunctionComponent } from 'react';
import { Heading } from '@navikt/ds-react';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import { BrodsmuleSti } from '../komponenter/BrodsmuleSti/BrodsmuleSti';

const IkkeTilgang: FunctionComponent = () => {
    return (
        <HvitSideBoks>
            <BrodsmuleSti />
            <Heading level="3" size="small">
                Du har dessverre ikke tilgang til å fylle ut skjema om permittering
            </Heading>
            <p>
                For å fylle ut skjema kreves det at du har en rolle eller rettighet i virksomheten i
                Altinn
            </p>
        </HvitSideBoks>
    );
};
export default IkkeTilgang;
