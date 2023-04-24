import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Stepper } from '@navikt/ds-react';
import HvitSideBoks from './HvitSideBoks';
import VerticalSpacer from './VerticalSpacer';
import AvbrytLagreSlett from './AvbrytLagreSlett/AvbrytLagreSlett';
import './SkjemaRamme.css';
import { SkjemaSteg } from '../../types/SkjemaNavigasjon';

interface SkjemaRammeProps {
    steg: SkjemaSteg[];
    lagre: () => Promise<void>;
    slett: () => Promise<void>;
}

const SkjemaRamme: FunctionComponent<SkjemaRammeProps> = ({ children, steg, lagre, slett }) => {
    const history = useHistory();
    const activeStep = steg.find(({ aktiv }) => aktiv)?.number ?? 1;
    return (
        <>
            <VerticalSpacer rem={2} />
            <Stepper
                aria-labelledby="stepper-heading"
                activeStep={activeStep}
                onStepChange={async (x) => {
                    await lagre();
                    const s = steg.find((s) => s.number === x);
                    if (s) {
                        history.push(s.path);
                    }
                }}
                orientation="horizontal"
            >
                {steg.map(({ label }) => (
                    <Stepper.Step>{label}</Stepper.Step>
                ))}
            </Stepper>

            <HvitSideBoks>{children}</HvitSideBoks>
            <VerticalSpacer rem={1} />
            <AvbrytLagreSlett lagre={lagre} slett={slett} />
        </>
    );
};

export default SkjemaRamme;
