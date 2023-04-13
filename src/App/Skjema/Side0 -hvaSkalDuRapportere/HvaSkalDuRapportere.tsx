import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import environment from '../../../utils/environment';
import {
    loggAntallUnderenheter,
    loggSkjemaValg,
} from '../../../utils/funksjonerForAmplitudeLogging';
import { BedriftsVelger } from '../../komponenter/Bedriftsvelger/Bedriftsvelger';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import './HvaSkalDuRapportere.css';
import infoIkon from './info.svg';

const HvaSkalDuRapportere = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState(
        organisasjoner[0].OrganizationNumber
    );
    const [skjemaType, setSkjemaType] = useState<Permitteringsskjema['type'] | undefined>();

    useEffect(() => {
        if (environment.MILJO === 'prod-gcp') {
            loggAntallUnderenheter(organisasjoner.length);
        }
    }, [valgtOrganisasjon, organisasjoner]);

    loggSkjemaValg('hva-skal-du-varsle-om');

    const opprettOgNavigerTilSkjema = async () => {
        const newId = await context.opprett({
            bedriftNr: valgtOrganisasjon,
            type: skjemaType!,
        });
        history.push('/skjema/kontaktinformasjon/' + newId);
    };
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    const radios = [
        {
            label: 'Permittering uten lønn',
            value: 'PERMITTERING_UTEN_LØNN',
            id: 'permittering',
        },
        {
            label: 'Masseoppsigelser',
            value: 'MASSEOPPSIGELSE',
            id: 'masseoppsigelser',
        },
        {
            label: 'Innskrenkning i arbeidstid',
            value: 'INNSKRENKNING_I_ARBEIDSTID',
            id: 'innskrenkning',
        },
    ];

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname="hva-skal-du-rapportere">
                <Systemtittel>Hva vil du informere NAV om?</Systemtittel>
                <RadioPanelGruppe
                    name="samplename"
                    legend="Hva vil du informere NAV om?"
                    radios={radios}
                    checked={skjemaType}
                    onChange={(event, value) => {
                        setSkjemaType(value);
                        loggSkjemaValg(value);
                    }}
                />
                <div className="hva-skal-du-rapportere__forklaring-boks">
                    <Normaltekst className="forklaring">
                        <b>Permittering uten lønn</b> handler om at arbeidsgiver pålegger
                        arbeidstaker et midlertidig fritak uten lønn.
                    </Normaltekst>
                    <Normaltekst className="forklaring">
                        <b>Oppsigelse</b> betyr at arbeidsforholdet mellom arbeidsgiver og
                        arbeidstaker avsluttes.
                    </Normaltekst>
                    <Normaltekst className="forklaring">
                        <b>Innskrenkning i arbeidstid</b> vil si at arbeidstakerens stillingsprosent
                        blir redusert.
                    </Normaltekst>
                </div>
                <BedriftsVelger
                    label="Hvilken virksomhet vil du sende inn skjema for?"
                    organisasjoner={organisasjoner}
                    setOrganisasjon={setValgtOrganisasjon}
                />
                <Normaltekst className="hva-skal-du-rapportere__info-om-virksomhet-juridisk">
                    <img alt="" className="hva-skal-du-rapportere__infoikon" src={infoIkon} />
                    Du kan kun sende skjema på vegne av virksomhet (også kalt underenhet), og ikke
                    på vegne av juridisk enhet.
                </Normaltekst>
                <Hovedknapp
                    disabled={skjemaType === undefined}
                    className="hva-skal-du-rapportere__knapp"
                    onClick={opprettOgNavigerTilSkjema}
                >
                    Gå til skjema
                </Hovedknapp>
                <Lenke className="hva-skal-du-rapportere__avbryt" href="/permittering">
                    Avbryt
                </Lenke>
            </HvitSideBoks>
        </>
    );
};

export default HvaSkalDuRapportere;
