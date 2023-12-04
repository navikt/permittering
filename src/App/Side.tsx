import React, {FunctionComponent, ReactNode} from "react";
import Banner from "./komponenter/Banner/Banner";
import './Side.css';

type SideProps = {
    tittel: string,
    children: ReactNode,
};
export const Side: FunctionComponent<SideProps> = ({tittel, children}) => {
    return (
        <div className="side-container">
            <Banner tittel={tittel}/>
            <div className="side-content">
                {children}
            </div>
        </div>
    );
};