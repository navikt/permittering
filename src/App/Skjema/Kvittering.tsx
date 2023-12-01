import React, {FunctionComponent} from "react";
import {useParams} from "react-router-dom";

export const Kvittering: FunctionComponent = () => {
    const {skjemaId} = useParams();
    // TODO: useSkjema swr med hent fra backend
    return (
        <div>
            <h1>KvitteringV2: {skjemaId}</h1>
        </div>
    );
}