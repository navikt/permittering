import React, { FunctionComponent } from 'react';
import { AvbrytOgLagreSkjema } from './AvbrytOgLagreSkjema/AvbrytOgLagreSkjema';
import { SlettSkjema } from './SlettSkjema/SlettSkjema';
import './AvbrytLagreSlett.less';

interface AvbrytLagreSlettProps {
    lagre: () => Promise<void>;
    slett: () => Promise<void>;
}

const AvbrytLagreSlett: FunctionComponent<AvbrytLagreSlettProps> = ({ lagre, slett }) => {
    return (
        <div className="avbryt-slett-knapper">
            <div className="knapper">
                <AvbrytOgLagreSkjema lagre={lagre} />
                <SlettSkjema slett={slett} />
            </div>
        </div>
    );
};

export default AvbrytLagreSlett;
