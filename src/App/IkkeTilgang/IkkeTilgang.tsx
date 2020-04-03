import { FunctionComponent, useContext } from 'react';
import React from 'react';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import { Undertittel } from 'nav-frontend-typografi';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';
import { BrodsmuleSti } from '../komponenter/BrodsmuleSti/BrodsmuleSti';

const IkkeTilgang: FunctionComponent = props => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visskjema = featureToggleContext[Feature.visskjema];
    return (
        <HvitSideBoks>
            <BrodsmuleSti />
            <Undertittel>
                Du har dessverre ikke tilgang til å fylle ut skjema om permittering
            </Undertittel>
            <br />
            <>
                For å fylle ut skjema kreves det at du har en rolle eller rettighet i bedriften i
                Altinn
                {visskjema && <>visskjema</>}
            </>
        </HvitSideBoks>
    );
};
export default IkkeTilgang;
