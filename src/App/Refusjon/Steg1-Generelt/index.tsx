import { Column, Container, Row } from 'nav-frontend-grid';
import { Input } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import UndertittelRow from '../../komponenter/Grid/UndertittelRow';
import InputEpost from '../../komponenter/Skjema/InputEpost';
import InputTelefon from '../../komponenter/Skjema/InputTelefon';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import RefusjonContext from '../RefusjonContext';
import { useRefusjonSteg } from '../use-refusjon-steg';

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
                <VerticalSpacer rem={2} />
                <Container fluid={true}>
                    <UndertittelRow>Informasjon om arbeidsgiver</UndertittelRow>
                    <VerticalSpacer rem={0.5} />
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
                    <VerticalSpacer rem={2} />
                    <UndertittelRow>Kontaktperson i virksomheten</UndertittelRow>
                    <VerticalSpacer rem={0.5} />
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
