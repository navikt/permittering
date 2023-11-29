import React, {FunctionComponent} from 'react';
import {BodyLong, Button, Heading, Label, Link} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {useNavigate} from 'react-router-dom';
import InfoIkon from './InfoIkon';
import './InfoOmMeldepliktBoks.css';

const InfoOmMeldepliktBoks: FunctionComponent = () => {
    const navigate = useNavigate();
    return (
        <div className="forside__info-om-meldeplikt-boks">
            <div className="ikon">
                <InfoIkon />
            </div>
            <div className="innhold">
                <Heading level="3" size="medium">
                    Arbeidsgivers meldeplikt til NAV
                </Heading>
                <BodyLong size="large" className="ingress">
                    Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller flere
                    ansatte? Da har du meldeplikt til NAV. Du kan også melde ifra til NAV dersom det
                    gjelder færre enn 10 ansatte om du ønsker det.
                </BodyLong>

                <Label>Dette er bestemt av:</Label>
                <ul>
                    <li>
                        <Link href="https://lovdata.no/lov/2004-12-10-76/§8">
                            <span>Arbeidsmarkedsloven §8</span> <ExternalLinkIcon title="Ekstern lenke. Åpnes i ny fane" fontSize="1.5rem" />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://lovdata.no/lov/2005-06-17-62/§15-2">
                            <span>Arbeidsmiljøloven §15-2 </span> <ExternalLinkIcon title="Ekstern lenke. Åpnes i ny fane" fontSize="1.5rem" />
                        </Link>
                    </li>
                </ul>

                <Button className="meld-fra-knapp" onClick={() => navigate('skjema/start')}>
                    Meld fra til NAV
                </Button>
            </div>
        </div>
    );
};

export default InfoOmMeldepliktBoks;
