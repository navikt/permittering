import React, { FunctionComponent } from 'react';
import './AttributtVisning.css';

interface Props {
    className?: string;
    attributt: string;
    attributtVerdi?: any;
}

const AttributtVisning: FunctionComponent<Props> = (props) => {
    return (
        <div className="attributt">
            <div className="attributt__navn"> {props.attributt}</div>
            <div className="attributt__verdi"> {props.attributtVerdi}</div>
        </div>
    );
};

export default AttributtVisning;
