import React, { FunctionComponent } from 'react';
import { Button, Heading, Ingress, Label, Link } from '@navikt/ds-react';
import { useHistory } from 'react-router';
import { BrodsmuleSti } from '../../komponenter/BrodsmuleSti/BrodsmuleSti';
import InfoIkon from './InfoIkon';
import { EksternLenke } from './EksternLenke';
import './InfoOmMeldepliktBoks.css';

const InfoOmMeldepliktBoks: FunctionComponent = () => {
    const history = useHistory();
    return (
        <div className="forside__info-om-meldeplikt-boks">
            <BrodsmuleSti />
            <div className="ikon">
                <InfoIkon />
            </div>
            <div className="innhold">
                <Heading level="3" size="medium">
                    Arbeidsgivers meldeplikt til NAV
                </Heading>
                <Ingress className="ingress">
                    Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller flere
                    ansatte? Da har du meldeplikt til NAV. Du kan også melde ifra til NAV dersom det
                    gjelder færre enn 10 ansatte om du ønsker det.
                </Ingress>

                <Label>Dette er bestemt av:</Label>
                <ul>
                    <li>
                        <Link href="https://lovdata.no/lov/2004-12-10-76/§8">
                            <span>Arbeidsmarkedsloven §8</span> <EksternLenke />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://lovdata.no/lov/2005-06-17-62/§15-2">
                            <span>Arbeidsmiljøloven §15-2 </span> <EksternLenke />
                        </Link>
                    </li>
                </ul>

                <Button className="meld-fra-knapp" onClick={() => history.push('skjema/start')}>
                    Meld fra til NAV
                </Button>
            </div>
        </div>
    );
};

export default InfoOmMeldepliktBoks;
