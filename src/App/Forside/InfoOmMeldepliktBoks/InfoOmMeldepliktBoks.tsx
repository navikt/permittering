import React, {FunctionComponent} from 'react';
import {BodyLong, Box, Button, Heading, Link, List, VStack} from '@navikt/ds-react';
import {ExternalLinkIcon} from '@navikt/aksel-icons';
import {useNavigate} from 'react-router-dom';
import './InfoOmMeldepliktBoks.css';

const InfoOmMeldepliktBoks: FunctionComponent = () => {
    const navigate = useNavigate();
    return (
        <Box
            background="bg-default"
            borderRadius="small"
            padding={{xs: '2', md: '4', lg: '8'}}
        >
            <VStack gap="8">
                <Heading level="3" size="medium">
                    Arbeidsgivers meldeplikt til NAV
                </Heading>
                <BodyLong size="large" className="ingress">
                    Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller flere
                    ansatte? Da har du meldeplikt til NAV. Du kan også melde ifra til NAV dersom det
                    gjelder færre enn 10 ansatte om du ønsker det.
                </BodyLong>

                <List as="ul" title="Dette er bestemt av:" size="small">
                    <List.Item>
                        <Link href="https://lovdata.no/lov/2004-12-10-76/§8">
                            Arbeidsmarkedsloven §8 <ExternalLinkIcon title="Ekstern lenke. Åpnes i ny fane" fontSize="1.5rem" />
                        </Link>
                    </List.Item>
                    <List.Item>
                        <Link href="https://lovdata.no/lov/2005-06-17-62/§15-2">
                            Arbeidsmiljøloven §15-2 <ExternalLinkIcon title="Ekstern lenke. Åpnes i ny fane" fontSize="1.5rem" />
                        </Link>
                    </List.Item>
                </List>

                <Button className="meld-fra-knapp" spacing onClick={() => navigate('skjema/start')}>
                    Meld fra til NAV
                </Button>
            </VStack>

        </Box>
    );
};

export default InfoOmMeldepliktBoks;
