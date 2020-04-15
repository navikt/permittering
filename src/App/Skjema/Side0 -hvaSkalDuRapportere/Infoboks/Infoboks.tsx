import React from 'react';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import veilederpanelikon from './ikoner/infoikon.svg';
import HusIkon from './ikoner/HusIkon';
import ArkIkon from './ikoner/ArkIkon';
import './Infoboks.less';

const Infoboks = () => {
    return (
        <Veilederpanel
            type="plakat"
            kompakt
            fargetema="info"
            svg={<img src={veilederpanelikon} alt="" aria-hidden="true" />}
        >
            <Systemtittel>Før du begynner</Systemtittel>
            <Normaltekst id="overskrift-hvilke-virksomheter" className="overskrift-med-ikon bold">
                <HusIkon />
                Hvilke virksomheter kan du melde ifra på vegne av?
            </Normaltekst>
            <ul aria-labelledby="overskrift-hvilke-virksomheter">
                <li>
                    <Normaltekst>
                        Du kan melde ifra på vegne av én eller flere virksomheter (også kalt
                        underenheter).
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>Du kan ikke melde ifra på vegne av en juridisk enhet.</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Du kan kun melde ifra på vegne av virksomheter som tilhører samme juridiske
                        enhet.
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Velger du flere virksomheter vil du senere i skjemaet bli spurt om hvor
                        mange som berøres i hver enkelt virksomhet.
                    </Normaltekst>
                </li>
            </ul>
            <Normaltekst id="overskrift-vedlegg" className="overskrift-med-ikon bold">
                <ArkIkon />
                Du trenger ikke legge ved protokoll eller vedlegg
            </Normaltekst>
            <ul aria-labelledby="overskrift-vedlegg">
                <li>
                    Dersom du har pratet med de ansatte og tillitsvalgt er det flott. Men det er
                    ingen krav til å legge ved dokumentasjon på dette i skjemaet.
                </li>
                <li>
                    Du trenger heller ikke legge ved navn på de enkelte ansatte som blir berørt.
                </li>
            </ul>
        </Veilederpanel>
    );
};
export default Infoboks;
