import * as React from 'react';
import './HvitSideBoks.less';

const HvitSideBoks: React.FunctionComponent = props => (
    <div className={"hvit-side-boks"}>
        {props.children}
    </div>
);

export default HvitSideBoks;
