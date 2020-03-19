import React, { FunctionComponent, useContext } from 'react';
import './SkjemaRamme.less';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { useHistory, useParams } from 'react-router-dom';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { createSkjemaPath, SkjemaSideProps, skjemaSteg } from '../Skjema/skjema-steg';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import HvitSideBoks from './HvitSideBoks';
import VerticalSpacer from './VerticalSpacer';
import { AvbrytSkjema } from './AvbrytSkjema/AvbrytSkjema';

const SkjemaRamme: FunctionComponent<SkjemaSideProps> = ({ children }) => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    let { id } = useParams();
    const steg = skjemaSteg(history.location.pathname);
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
                onChange={index => skiftSide(index)}
                visLabel
                autoResponsiv
            />
            <HvitSideBoks>{children}</HvitSideBoks>
            <VerticalSpacer rem={1} />
            <div style={{ textAlign: 'center' }}>
                <AvbrytSkjema />
            </div>
        </>
    );
};

export default SkjemaRamme;
