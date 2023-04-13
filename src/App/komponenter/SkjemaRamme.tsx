import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import HvitSideBoks from './HvitSideBoks';
import VerticalSpacer from './VerticalSpacer';
import AvbrytLagreSlett from './AvbrytLagreSlett/AvbrytLagreSlett';
import './SkjemaRamme.css';
import Stegindikator from 'nav-frontend-stegindikator';
import { SkjemaSteg } from '../../types/SkjemaNavigasjon';

interface SkjemaRammeProps {
    steg: SkjemaSteg[];
    lagre: () => Promise<void>;
    slett: () => Promise<void>;
}

const SkjemaRamme: FunctionComponent<SkjemaRammeProps> = ({ children, steg, lagre, slett }) => {
    const history = useHistory();
    const skiftSide = (index: number) => {
        history.push(steg[index].path);
    };
    return (
        <>
            <VerticalSpacer rem={2} />
            <Stegindikator
                steg={steg}
                onChange={async (index) => {
                    await lagre();
                    skiftSide(index);
                }}
                visLabel
                autoResponsiv
            />

            <HvitSideBoks>{children}</HvitSideBoks>
            <VerticalSpacer rem={1} />
            <AvbrytLagreSlett lagre={lagre} slett={slett} />
        </>
    );
};

export default SkjemaRamme;
