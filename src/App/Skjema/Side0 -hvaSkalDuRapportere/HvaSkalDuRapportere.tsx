import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import environment from '../../../utils/environment';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import { loggAntallUnderenheter } from '../../../utils/funksjonerForAmplitudeLogging';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import Skjemavalg from './Skjemavalg';
import Infoboks from './Infoboks/Infoboks';
import infoIkon from './info.svg';
import './HvaSkalDuRapportere.less';

const HvaSkalDuRapportere = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState(
        organisasjoner[0].OrganizationNumber
    );
    const [skjemaType, setSkjemaType] = useState<Permitteringsskjema['type'] | undefined>();

    useEffect(() => {
        if (environment.MILJO === 'prod-sbs') {
            loggAntallUnderenheter(organisasjoner.length);
        }
    }, [valgtOrganisasjon, organisasjoner]);

    const opprettOgNavigerTilSkjema = async () => {
        const newId = await context.opprett({
            bedriftNr: valgtOrganisasjon,
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
                <div className="hva-skal-du-rapportere__info-om-virksomhet-juridisk">
                    <img alt="" className="hva-skal-du-rapportere__infoikon" src={infoIkon} />
                    Du kan kun sende skjema på vegne av virksomhet (også kalt underenhet), og ikke
                    på vegne av juridisk enhet.
                </div>

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
