import React, { FunctionComponent, useContext } from 'react';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { useHistory } from 'react-router-dom';
import RefusjonContext from '../RefusjonContext';
import { useRefusjonSteg } from '../use-refusjon-steg';
import { Systemtittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Column, Container, Row } from 'nav-frontend-grid';
import UndertittelRow from '../../komponenter/Grid/UndertittelRow';
import InputTelefon from '../../komponenter/Skjema/InputTelefon';
import InputEpost from '../../komponenter/Skjema/InputEpost';
import Dekorator from '../../komponenter/Dekorator/Dekorator';

const Generelt: FunctionComponent = () => {
    const context = useContext(RefusjonContext);
    const history = useHistory();
    const { steg } = useRefusjonSteg(history.location.pathname, context.skjema.id);
    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <Systemtittel>Kontaktinformasjon</Systemtittel>
                <Container fluid={true}>
                    <UndertittelRow>Informasjon om arbeidsgiver</UndertittelRow>
                    <Row className="">
                        <Column md="6">
                            <Input
                                bredde="L"
                                label="Bedriftens navn"
                                defaultValue={context.skjema.bedriftNavn}
                                disabled
                            />
                        </Column>
                        <Column md="6">
                            <Input
                                bredde="L"
                                label="Bedriftsnummer"
                                defaultValue={context.skjema.bedriftNr}
                                disabled
                            />
                        </Column>
                    </Row>
                    <UndertittelRow>Kontaktperson i virksomheten</UndertittelRow>
                    <Row className="">
                        <Column md="12">
                            <Input
                                bredde="L"
                                label="Navn"
                                defaultValue={context.skjema.kontaktNavn}
                                onChange={event =>
                                    context.endreSkjemaVerdi(
                                        'kontaktNavn',
                                        event.currentTarget.value
                                    )
                                }
                            />
                        </Column>
                    </Row>
                    <Row className="">
                        <Column md="6">
                            <InputTelefon
                                bredde="L"
                                defaultValue={context.skjema.kontaktTlf}
                                onChange={e => {
                                    context.endreSkjemaVerdi('kontaktTlf', e.currentTarget.value);
                                }}
                            />
                        </Column>
                        <Column md="6">
                            <InputEpost
                                bredde="L"
                                defaultValue={context.skjema.kontaktEpost}
                                onChange={e => {
                                    context.endreSkjemaVerdi('kontaktEpost', e.currentTarget.value);
                                }}
                            />
                        </Column>
                    </Row>
                </Container>
            </SkjemaRamme>
        </>
    );
};
export default Generelt;
