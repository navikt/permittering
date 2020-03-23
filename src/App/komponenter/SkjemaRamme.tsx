import React, { FunctionComponent, useContext } from 'react';
import './SkjemaRamme.less';
import Stegindikator from 'nav-frontend-stegindikator/lib/stegindikator';
import { useHistory, useParams } from 'react-router-dom';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { createSkjemaPath, SkjemaSideProps, skjemaSteg } from '../Skjema/skjema-steg';
import SkjemaContext from '../SkjemaContext/SkjemaContext';
import HvitSideBoks from './HvitSideBoks';
import VerticalSpacer from './VerticalSpacer';
import { SlettSkjema } from './SlettSkjema/SlettSkjema';
import { AvbrytOgLagreSkjema } from './AvbrytOgLagreSkjema/AvbrytOgLagreSkjema';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';

const SkjemaRamme: FunctionComponent<SkjemaSideProps> = ({ children }) => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const tillatMassePermittering = featureToggleContext[Feature.tillatMassePermittering];
    const history = useHistory();
    const context = useContext(SkjemaContext);
    let { id } = useParams();
    const steg = skjemaSteg(history.location.pathname, tillatMassePermittering);
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
            <div style={{ width: '45rem', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <AvbrytOgLagreSkjema />
                    <SlettSkjema />
                </div>
            </div>
        </>
    );
};

export default SkjemaRamme;
