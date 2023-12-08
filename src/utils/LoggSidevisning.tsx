import {FunctionComponent} from "react";
import {useLoggSidevisning} from "./funksjonerForAmplitudeLogging";

export const LoggSidevisning: FunctionComponent = () => {
    useLoggSidevisning();
    return <></>;
}