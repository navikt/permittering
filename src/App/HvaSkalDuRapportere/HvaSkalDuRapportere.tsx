import React, { FunctionComponent, useContext, useState } from 'react';
import './HvaSkalDuRapportere.less';
import AlternativBoks from './AlternativBoks/AlternativBoks';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import { useHistory } from 'react-router-dom';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import { Permitteringsskjema } from '../../types/permitteringsskjema';
import { OrganisasjonsListeContext } from '../OrganisasjonslisteProvider';
import { BedriftsVelger } from '../komponenter/Bedriftsvelger/Bedriftsvelger';
import { Systemtittel } from 'nav-frontend-typografi';
import Banner from '../HovedBanner/HovedBanner';

const HvaSkalDuRapportere: FunctionComponent = () => {
    const context = useContext(SkjemaContext);
    const { organisasjoner } = useContext(OrganisasjonsListeContext);
    const [valgtOrganisasjon, setValgtOrganisasjon] = useState(
        organisasjoner[0].OrganizationNumber
    );
    const [skjemaType, setSkjemaType] = useState<Permitteringsskjema['type'] | undefined>();
    const history = useHistory();
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
            <Banner sidetittel={sidetittel} />
            <div className="hva-skal-du-rapportere">
                <Systemtittel>Hva vil du informere NAV om?</Systemtittel>
                <div className={'hva-skal-du-rapportere__boks-container'}>
                    <AlternativBoks
                        innholdstekst={
                            <>
                                <b>Permittering uten lønn</b> handler om at arbeidsgiver pålegger
                                arbeidstaker et midlertidig fritak uten lønn.
                            </>
                        }
                        radioknappSkrift={'Permittering uten lønn'}
                        onChange={() => setSkjemaType('PERMITTERING_UTEN_LØNN')}
                        checked={skjemaType === 'PERMITTERING_UTEN_LØNN'}
                    />
                    <AlternativBoks
                        innholdstekst={
                            <>
                                <b>Oppsigelse</b> betyr at arbeidsforholdet mellom arbeidsgiver og
                                arbeidstaker avsluttes.
                            </>
                        }
                        radioknappSkrift={'Masseoppsigelser'}
                        onChange={() => setSkjemaType('MASSEOPPSIGELSE')}
                        checked={skjemaType === 'MASSEOPPSIGELSE'}
                    />
                    <AlternativBoks
                        innholdstekst={
                            <>
                                <b>Innskrenkning i arbeidstid</b> vil si at arbeidstakerens
                                stillingsprosent blir redusert.
                            </>
                        }
                        radioknappSkrift={'Innskrenkning i arbeidstid'}
                        onChange={() => setSkjemaType('INNSKRENKNING_I_ARBEIDSTID')}
                        checked={skjemaType === 'INNSKRENKNING_I_ARBEIDSTID'}
                    />
                </div>
                <BedriftsVelger
                    organisasjoner={organisasjoner}
                    setOrganisasjon={setValgtOrganisasjon}
                />
                <Hovedknapp
                    disabled={skjemaType === undefined}
                    className={'hva-skal-du-rapportere__hoved-knapp'}
                    onClick={opprettOgNavigerTilSkjema}
                >
                    Gå til skjema
                </Hovedknapp>
            </div>
        </>
    );
};

export default HvaSkalDuRapportere;
