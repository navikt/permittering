import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { OrganisasjonsListeContext } from '../OrganisasjonslisteProvider';
import { Permitteringsskjema } from '../../types/permitteringsskjema';
import { BedriftsVelger } from '../komponenter/Bedriftsvelger/Bedriftsvelger';
import './HvaSkalDuRapportere.less';
import Dekorator from '../komponenter/Dekorator/Dekorator';
import environment from '../../utils/environment';
import { loggBedriftsInfo } from '../../utils/funksjonerForAmplitudeLogging';

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
            const fullBedrift = organisasjoner.filter(
                org => org.OrganizationNumber === valgtOrganisasjon
            )[0];
            console.log('full bedrift: ', fullBedrift);
            loggBedriftsInfo(fullBedrift);
        }
    }, [valgtOrganisasjon, organisasjoner]);

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
            <div className="hva-skal-du-rapportere">
                <Systemtittel>Hva vil du informere NAV om?</Systemtittel>
                <RadioPanelGruppe
                    name="samplename"
                    legend=""
                    radios={radios}
                    checked={skjemaType}
                    onChange={(event, value) => setSkjemaType(value)}
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
                    organisasjoner={organisasjoner}
                    setOrganisasjon={setValgtOrganisasjon}
                />
                <Hovedknapp
                    disabled={skjemaType === undefined}
                    className="hva-skal-du-rapportere__knapp"
                    onClick={opprettOgNavigerTilSkjema}
                >
                    Gå til skjema
                </Hovedknapp>
            </div>
        </>
    );
};

export default HvaSkalDuRapportere;
