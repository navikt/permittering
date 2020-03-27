import React from 'react';
import { AvbrytOgLagreSkjema } from './AvbrytOgLagreSkjema/AvbrytOgLagreSkjema';
import { SlettSkjema } from './SlettSkjema/SlettSkjema';
import './AvbrytLagreSlett.less';

const AvbrytLagreSlett = () => {
    return (
        <div className="avbryt-slett-knapper">
            <div className="knapper">
                <AvbrytOgLagreSkjema />
                <SlettSkjema />
            </div>
        </div>
    );
};

export default AvbrytLagreSlett;
