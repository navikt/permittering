import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import SkjemaContext from '../SkjemaContext/SkjemaContext';

import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import Skjemavalg from './Skjemavalg/Skjemavalg';
import Infoboks from './Infoboks/Infoboks';
import './HvaSkalDuRapportere.less';

const HvaSkalDuRapportere = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    //const { organisasjoner, organisasjonstre } = useContext(OrganisasjonsListeContext);
    //const [valgtOrganisasjon] = useState<string >(organisasjonstre[0].JuridiskEnhet.OrganizationNumber);
    const [skjemaType, setSkjemaType] = useState<Permitteringsskjema['type'] | undefined>();

    const opprettOgNavigerTilSkjema = async () => {
        const newId = await context.opprett({
            type: skjemaType!,
        });
        history.push('/skjema/antall-berorte/' + newId);
    };
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser eller innskrenkning i arbeidstid';

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname="hva-skal-du-rapportere">
                <Infoboks />
                <Skjemavalg skjemaType={skjemaType} setSkjemaType={setSkjemaType} />
                <Hovedknapp
                    disabled={skjemaType === undefined}
                    className="hva-skal-du-rapportere__knapp"
                    onClick={opprettOgNavigerTilSkjema}
                >
                    Gå til skjema
                </Hovedknapp>
                <Lenke className="hva-skal-du-rapportere__avbryt" href={'/permittering'}>
                    Avbryt
                </Lenke>
            </HvitSideBoks>
        </>
    );
};

export default HvaSkalDuRapportere;
