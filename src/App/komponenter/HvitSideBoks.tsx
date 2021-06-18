import React from 'react';
import './HvitSideBoks.less';

interface Props {
    classname?: string;
}

const HvitSideBoks: React.FunctionComponent<Props> = (props) => (
    <div className={`hvit-side-boks ${props.classname ? props.classname : ''}`}>
        {props.children}
    </div>
);

export default HvitSideBoks;
