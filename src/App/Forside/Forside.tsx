import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import infoIkon from './info.svg';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';
import { Permitteringsskjema } from '../../types/permitteringsskjema';
import { hentAlle } from '../../api/skjema-api';
import SkjemaTabell from './komponenter/SkjemaTabell';
import HvitSideBoks from '../komponenter/HvitSideBoks';
import './Forside.less';
import Dekorator from '../komponenter/Dekorator/Dekorator';
import Lenke from 'nav-frontend-lenker';
import { EksternLenke } from './EksternLenke';

const Forside: FunctionComponent = () => {
    const history = useHistory();
    const featureToggleContext = useContext(FeatureToggleContext);
    const visskjema = featureToggleContext[Feature.visskjema];
    const [skjemaer, setSkjemaer] = useState<Permitteringsskjema[]>([]);
    const sidetittel =
        'Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid';

    useEffect(() => {
        hentAlle().then(setSkjemaer);
    }, []);

    return (
        <>
            <Dekorator sidetittel={sidetittel} />
            <HvitSideBoks classname={'forside__info-om-meldeplikt-boks'}>
                <div>
                    <img src={infoIkon} alt="" aria-hidden="true" />
                </div>
                <div className={'forside__info-om-meldeplikt-boks__innhold'}>
                    <Undertittel>Arbeidsgivers meldeplikt til NAV</Undertittel>
                    <div className={'forside__info-om-meldeplikt-boks__innhold__ingress'}>
                        <Normaltekst>
                            Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller
                            flere ansatte? Da har du meldeplikt til NAV. Du kan også melde ifra til
                            NAV dersom det gjelder færre enn 10 ansatte om du ønsker det.
                        </Normaltekst>
                    </div>
                    <Element>Dette er bestemt av:</Element>
                    <Lenke href={'https://lovdata.no/lov/2004-12-10-76/§8'}>
                        <span>Arbeidsmiljøloven §8</span> <EksternLenke />{' '}
                    </Lenke>
                    <br />
                    <Lenke href={'https://lovdata.no/lov/2005-06-17-62/§15-2'}>
                        <span>Arbeidsmiljøloven §15-2 </span> <EksternLenke />{' '}
                    </Lenke>
                    <br />
                    {visskjema && (
                        <div
                            className={
                                'forside__info-om-meldeplikt-boks__innhold__meld-til-nav-knapp'
                            }
                        >
                            <Hovedknapp onClick={() => history.push('skjema/start')}>
                                Meld fra til NAV
                            </Hovedknapp>
                        </div>
                    )}
                </div>
            </HvitSideBoks>
            <HvitSideBoks>
                <div className="forside__topp">
                    <Systemtittel>Dine skjema</Systemtittel>
                </div>
                {skjemaer.length ? (
                    <SkjemaTabell skjemaer={skjemaer} />
                ) : (
                    <p>
                        <i>Ingen skjemaer</i>
                    </p>
                )}
            </HvitSideBoks>
        </>
    );
};

export default Forside;
