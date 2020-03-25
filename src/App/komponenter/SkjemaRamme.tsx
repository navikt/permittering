import React, { FunctionComponent, useContext } from 'react';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { useHistory, useParams } from 'react-router-dom';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { createSkjemaPath, useSkjemaSteg } from '../Skjema/use-skjema-steg';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import HvitSideBoks from './HvitSideBoks';
import VerticalSpacer from './VerticalSpacer';
import AvbrytLagreSlett from './AvbrytLagreSlett/AvbrytLagreSlett';
import './SkjemaRamme.less';

const SkjemaRamme: FunctionComponent = ({ children }) => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    let { id } = useParams();
    const { steg } = useSkjemaSteg(history.location.pathname, context.skjema.id);

    const skiftSide = (index: number) => {
        history.push(createSkjemaPath(steg[index].slug, id));
    };

    if (context.skjema.sendtInnTidspunkt) {
        history.replace('/skjema/kvitteringsside');
    }

    return (
        <>
            <VerticalSpacer rem={2} />
            <Stegindikator
                steg={steg as StegindikatorStegProps[]}
                onChange={async index => {
                    await context.lagre();
                    skiftSide(index);
                }}
                visLabel
                autoResponsiv
            />
            <VerticalSpacer rem={2} />
            <HvitSideBoks>{children}</HvitSideBoks>
            <VerticalSpacer rem={1} />
            <AvbrytLagreSlett />
        </>
    );
};

export default SkjemaRamme;
