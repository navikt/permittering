import React, { FunctionComponent } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { useHistory } from 'react-router';
import { BrodsmuleSti } from '../../komponenter/BrodsmuleSti/BrodsmuleSti';
import InfoIkon from './InfoIkon';
import { EksternLenke } from './EksternLenke';
import './InfoOmMeldepliktBoks.less';

const InfoOmMeldepliktBoks: FunctionComponent = (props) => {
    const history = useHistory();
    return (
        <div className="forside__info-om-meldeplikt-boks">
            <BrodsmuleSti />
            <div className="ikon">
                <InfoIkon />
            </div>
            <div className="innhold">
                <Systemtittel>Arbeidsgivers meldeplikt til NAV</Systemtittel>
                <Normaltekst className="ingress">
                    Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller flere
                    ansatte? Da har du meldeplikt til NAV. Du kan også melde ifra til NAV dersom det
                    gjelder færre enn 10 ansatte om du ønsker det.
                </Normaltekst>

                <Element>Dette er bestemt av:</Element>
                <ul>
                    <li>
                        <Lenke href="https://lovdata.no/lov/2004-12-10-76/§8">
                            <span>Arbeidsmarkedsloven §8</span> <EksternLenke />
                        </Lenke>
                    </li>
                    <li>
                        <Lenke href="https://lovdata.no/lov/2005-06-17-62/§15-2">
                            <span>Arbeidsmiljøloven §15-2 </span> <EksternLenke />
                        </Lenke>
                    </li>
                </ul>

                <Hovedknapp className="meld-fra-knapp" onClick={() => history.push('skjema/start')}>
                    Meld fra til NAV
                </Hovedknapp>
            </div>
        </div>
    );
};

export default InfoOmMeldepliktBoks;
