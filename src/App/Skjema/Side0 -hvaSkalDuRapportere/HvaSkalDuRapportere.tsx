import { Button, Heading, Link, Radio, RadioGroup, Select } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Permitteringsskjema } from '../../../types/permitteringsskjema';
import environment from '../../../utils/environment';
import {
    loggAntallUnderenheter,
    loggSkjemaValg,
} from '../../../utils/funksjonerForAmplitudeLogging';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import { OrganisasjonsListeContext } from '../../OrganisasjonslisteProvider';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import './HvaSkalDuRapportere.css';

const HvaSkalDuRapportere = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState(
        organisasjoner[0].OrganizationNumber
    );
    const [skjemaType, setSkjemaType] =
        useState<Permitteringsskjema['type']>('PERMITTERING_UTEN_LØNN');

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

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname="hva-skal-du-rapportere">
                <Heading level="3" size="medium">
                    Hva vil du informere NAV om?
                </Heading>
                <RadioGroup
                    value={skjemaType}
                    legend="Hva vil du informere NAV om?"
                    onChange={(value: any) => {
                        setSkjemaType(value);
                        loggSkjemaValg(value);
                    }}
                >
                    <Radio
                        value="PERMITTERING_UTEN_LØNN"
                        description="Arbeidsgiver pålegger arbeidstaker et midlertidig fritak uten lønn."
                    >
                        Permittering uten lønn
                    </Radio>
                    <Radio
                        value="MASSEOPPSIGELSE"
                        description="Arbeidsforholdet mellom arbeidsgiver og arbeidstaker avsluttes."
                    >
                        Masseoppsigelser
                    </Radio>
                    <Radio
                        value="INNSKRENKNING_I_ARBEIDSTID"
                        description="Arbeidstakerens stillingsprosent blir redusert."
                    >
                        Innskrenkning i arbeidstid
                    </Radio>
                </RadioGroup>
                <Select
                    label="Hvilken virksomhet vil du sende inn skjema for?"
                    description="Du kan kun sende skjema på vegne av virksomhet (også kalt underenhet), og ikke på vegne av juridisk enhet."
                    onChange={(event) => {
                        setValgtOrganisasjon(event.target.value);
                    }}
                >
                    {organisasjoner.map((organisasjon) => {
                        return (
                            <option
                                key={organisasjon.OrganizationNumber}
                                value={organisasjon.OrganizationNumber}
                            >
                                {organisasjon.Name} - {organisasjon.OrganizationNumber}
                            </option>
                        );
                    })}
                </Select>
                <div className="hva-skal-du-rapportere__knapper">
                    <Button onClick={opprettOgNavigerTilSkjema}>Gå til skjema</Button>
                    <Link className="hva-skal-du-rapportere__avbryt" href="/permittering">
                        Avbryt
                    </Link>
                </div>
            </HvitSideBoks>
        </>
    );
};

export default HvaSkalDuRapportere;
