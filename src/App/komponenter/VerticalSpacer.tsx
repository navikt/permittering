import React, { FunctionComponent } from 'react';
import './VerticalSpacer.less';

const VerticalSpacer: FunctionComponent<{ rem: number }> = ({ rem }) => (
    <div className={'spacer-rem' + rem} />
);

export default VerticalSpacer;
