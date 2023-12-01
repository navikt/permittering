import React, {FunctionComponent} from 'react';
import {BodyLong, Box, Heading, Link, LinkPanel, List, ReadMore, VStack} from '@navikt/ds-react';
import './InfoOmMeldepliktBoks.css';

const InfoOmMeldepliktBoks: FunctionComponent = () => {
    return (
        <Box
            background="bg-default"
            borderRadius="small"
            padding={{xs: '2', md: '4', lg: '8'}}
        >
            <VStack gap="12">
                <VStack gap="4">
                    <BodyLong size="medium">
                        Skal du permittere, si opp eller innskrenke arbeidstiden til 10 eller flere ansatte?
                        Da har du meldeplikt til NAV. Du kan også melde fra til NAV hvis det gjelder under 10 ansatte, om ønskelig.
                    </BodyLong>

                    <ReadMore header="Hva sier loven?">
                        <VStack>
                            <Link href="https://lovdata.no/lov/2004-12-10-76/§8">
                                Arbeidsmarkedsloven §8 (lovdata.no)
                            </Link>
                            <Link href="https://lovdata.no/lov/2005-06-17-62/§15-2">
                                Arbeidsmiljøloven §15-2 (lovdata.no)
                            </Link>
                        </VStack>
                    </ReadMore>
                </VStack>


                <VStack gap="4">
                    <Heading level="2" size="large">
                        Velg aktuelt skjema:
                    </Heading>

                    <LinkPanel href="skjema/PERMITTERING_UTEN_LØNN" border>
                        <LinkPanel.Title>Permittering uten lønn</LinkPanel.Title>
                        <LinkPanel.Description>
                            Arbeidsgiver pålegger arbeidstaker et midlertidig fritak uten lønn.
                        </LinkPanel.Description>
                    </LinkPanel>

                    <LinkPanel href="skjema/MASSEOPPSIGELSE" border>
                        <LinkPanel.Title>Masseoppsigelser</LinkPanel.Title>
                        <LinkPanel.Description>
                            Arbeidsforholdet mellom arbeidsgiver og arbeidstaker avsluttes.
                        </LinkPanel.Description>
                    </LinkPanel>

                    <LinkPanel href="skjema/INNSKRENKNING_I_ARBEIDSTID" border>
                        <LinkPanel.Title>Innskrenkning i arbeidstid</LinkPanel.Title>
                        <LinkPanel.Description>
                            Arbeidstakerens stillingsprosent blir redusert.
                        </LinkPanel.Description>
                    </LinkPanel>
                </VStack>
            </VStack>

        </Box>
    );
};

export default InfoOmMeldepliktBoks;
