import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BEMHelper from '../../../utils/bem';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import HvitSideBoks from '../../komponenter/HvitSideBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { RefusjonOrganisasjonsListeContext } from '../../OrganisasjonslisteRefusjonProvider';
import { ReactComponent as VeilederIkon } from '../../Skjema/Side4-oppsummering/gjenstand.svg';
import RefusjonContext from '../RefusjonContext';
import './index.less';

const cls = BEMHelper('refusjon-velg-bedrift');

const VelgBedrift: FunctionComponent = () => {
    const history = useHistory();
    const refusjonContext = useContext(RefusjonContext);
    const { organisasjoner } = useContext(RefusjonOrganisasjonsListeContext);
    const [valgtOrganisasjon] = useState(organisasjoner[0].OrganizationNumber);

    const opprettOgNavigerTilSkjema = async () => {
        const newId = await refusjonContext.opprett({
            bedriftNr: valgtOrganisasjon,
            type: 'REFUSJONSKRAV_CORONOA',
        });
        history.push('/refusjon/generelt/' + newId);
    };
    return (
        <>
            <Dekorator sidetittel={'sadfsa'} />

            <VerticalSpacer rem={2} />
            <div className={cls.element('informasjonsboks')}>
                <Veilederpanel
                    type="plakat"
                    kompakt
                    fargetema="info"
                    svg={<VeilederIkon className={cls.element('veileder-ikon')} />}
                >
                    <Systemtittel>Viktig informasjon til deg</Systemtittel>
                    <Normaltekst>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <Undertittel>For hvilken periode dekker vi lønn?</Undertittel>
                    <Normaltekst>
                        <Normaltekst>
                            Vi dekker lønn som er betalt ut på forhånd fra og med 20. mars 2020.
                        </Normaltekst>
                        <Normaltekst>
                            Vi dekker <b>ikke</b> forskuttert lønn som har blitt betalt ut før 20.
                            mars 2020 etter loven. LENKE?
                        </Normaltekst>
                    </Normaltekst>
                    <VerticalSpacer rem={2} />
                    <Undertittel>Hvilken informasjon må du ha klar?</Undertittel>
                    <Normaltekst>
                        <ul>
                            <li>Fødselsnummer på alle berørte, gjerne i Excel-ark </li>
                            <li>Permitteringsgrad</li>
                            <li> Dato for perioden de berørte er berørt</li>
                        </ul>
                    </Normaltekst>
                </Veilederpanel>
            </div>

            <HvitSideBoks>
                <Systemtittel>Velg Bedrift</Systemtittel>

                <VerticalSpacer rem={2} />
                <Hovedknapp onClick={opprettOgNavigerTilSkjema}>Gå til refusjonssøknad</Hovedknapp>
            </HvitSideBoks>
        </>
    );
};
export default VelgBedrift;
