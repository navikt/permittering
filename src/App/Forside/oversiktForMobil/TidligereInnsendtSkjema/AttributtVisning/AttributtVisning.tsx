import React, { FunctionComponent } from 'react';
import './AttributtVisning.less';

interface Props {
    className?: string;
    attributt: string;
    attributtVerdi: any;
}

const AttributtVisning: FunctionComponent<Props> = props => {
    return (
        <li className="attributt" tabIndex={0}>
            <div className="attributt__navn"> {props.attributt}</div>
            <div className="attributt__verdi"> {props.attributtVerdi}</div>
        </li>
    );
};

export default AttributtVisning;
