import { Column, Container, Row } from 'nav-frontend-grid';
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
                            <Row className="">
                                <Column md="6">
                                    <Element>Periode for permittering: </Element>
                                </Column>
                                <Column md="6">27.02.2020 - 15.06.2020 </Column>
                            </Row>
                        </Container>
                    </div>
                </div>

                <LesMerPanel åpneLabel="Hva menes med dette?" lukkLabel="Lukk">
                    heheheheheheh
                </LesMerPanel>
            </SkjemaRamme>
        </>
    );
};
export default Oppsummering;
