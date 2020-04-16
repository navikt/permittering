import { Column, Container, Row } from 'nav-frontend-grid';
import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BEMHelper from '../../../utils/bem';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import LesMerPanel from '../../komponenter/LesMerPanel/LesMerPanel';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import RefusjonContext from '../RefusjonContext';
import { useRefusjonSteg } from '../use-refusjon-steg';
import './Oppsummering.less';

const cls = BEMHelper('oppsummering');

const Oppsummering: FunctionComponent = () => {
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
                <Systemtittel>Oppsummering</Systemtittel>
                <VerticalSpacer rem={2} />
                <div className={cls.element('ramme')}>
                    <div className={cls.element('ramme-innhold')}>
                        <Container fluid={true}>
                            <Normaltekst>
                                Virksomhetens refusjon fra NAV er beregnet til:
                            </Normaltekst>
                            <VerticalSpacer rem={1} />
                            <Systemtittel>58.000 kr</Systemtittel>
                            <VerticalSpacer rem={1} />

                            <Row className="">
                                <Column md="6">
                                    <Element>Antall personer med i refusjonen: </Element>
                                </Column>
                                <Column md="6">5</Column>
                            </Row>
                            {/* <Row className="">
                                <Column md="6">
                                    <Element>Periode for permittering: </Element>
                                </Column>
                                <Column md="6">27.02.2020 - 15.06.2020 </Column>
                            </Row> */}
                        </Container>
                    </div>
                </div>

                <VerticalSpacer rem={2} />
                <LesMerPanel åpneLabel="Hvordan regner vi ut refusjonsgrunnlaget?" lukkLabel="Lukk">
                    Vi regner ut refusjonsgrunnlaget ved å gjøre nøye beregninger basert på uttrekk
                    og kalkulasjoner som har blitt rapportert på grunnlag av lønnsinntekter for det
                    enkelete individ på ansattnivå hvor vi legger paragraf §2.3 andre ledd, første
                    bokstav, i økonomiregelementet til grunn for refusjoner tilknyttet de overnevnte
                    midlene. Disse beløpene vil i sin helehet bli lagt til grunn i gjennomgangen av
                    beregningen når man legger sammen alle summer som skal refunderes.
                </LesMerPanel>
                <VerticalSpacer rem={3} />
                <Element>
                    Vi stoler på at du har gitt oss riktige opplysninger, men før du går videre må
                    du godta følgende:
                </Element>
                <VerticalSpacer rem={1} />
                <Checkbox
                    label="Jeg forstår at hvis jeg mottar refusjon jeg ikke har rett på vil dette kunne kreves tilbake"
                    checked={true}
                />
                <VerticalSpacer rem={1} />
                <Checkbox
                    label="Noe annet de skal forstå/vise at de har forstått"
                    checked={false}
                />
                <VerticalSpacer rem={4} />
                <div className={cls.element('knappelinje')}>
                    <Knapp>Tilbake</Knapp>
                    <Knapp type="hoved">Send inn til godkjenning</Knapp>
                </div>
            </SkjemaRamme>
        </>
    );
};
export default Oppsummering;
