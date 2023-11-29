import React, {PropsWithChildren} from 'react';
import './HvitSideBoks.css';

interface Props {
    classname?: string;
}

const HvitSideBoks: React.FunctionComponent<PropsWithChildren<Props>> = (props) => (
    <div className={`hvit-side-boks ${props.classname ? props.classname : ''}`}>
        {props.children}
    </div>
);

export default HvitSideBoks;
