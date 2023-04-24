import React, { FunctionComponent } from 'react';
import './VerticalSpacer.css';

const VerticalSpacer: FunctionComponent<{ rem: 0.5 | 1 | 2 | 3 | 4 }> = ({ rem }) => (
    <div className={'spacer-rem-' + (rem === 0.5 ? 'halv' : rem)} />
);

export default VerticalSpacer;
