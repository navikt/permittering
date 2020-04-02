import React, { FunctionComponent } from 'react';
import './InfoOmMeldepliktBoks.less';
import infoIkon from '../info.svg';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { EksternLenke } from '../EksternLenke';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { useHistory } from 'react-router';

interface Props {
    visskjema: boolean;
}

const InfoOmMeldepliktBoks: FunctionComponent<Props> = props => {
    const history = useHistory();
    return (
        <div className={'forside__info-om-meldeplikt-boks'}>
            <div>
                <img
                    className={'forside__info-om-meldeplikt-boks__ikon'}
                    src={infoIkon}
                    alt=""
                    aria-hidden="true"
                />
            </div>
            <div className={'forside__info-om-meldeplikt-boks__innhold'}>
                <Systemtittel>Arbeidsgivers meldeplikt til NAV</Systemtittel>
                <div className={'forside__info-om-meldeplikt-boks__innhold__ingress'}>
                    <Normaltekst>
                        Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller flere
                        ansatte? Da har du meldeplikt til NAV. Du kan også melde ifra til NAV dersom
                        det gjelder færre enn 10 ansatte om du ønsker det.
                    </Normaltekst>
                </div>
                <Element>Dette er bestemt av:</Element>
                <div>
                    <Lenke href={'https://lovdata.no/lov/2004-12-10-76/§8'}>
                        <span>Arbeidsmarkedsloven §8</span> <EksternLenke />
                    </Lenke>
                </div>
                <div>
                    <Lenke href={'https://lovdata.no/lov/2005-06-17-62/§15-2'}>
                        <span>Arbeidsmiljøloven §15-2 </span> <EksternLenke />
                    </Lenke>
                </div>
                <br />
                <Hovedknapp onClick={() => history.push('skjema/start')}>
                    Meld fra til NAV
                </Hovedknapp>
            </div>
        </div>
    );
};

export default InfoOmMeldepliktBoks;
