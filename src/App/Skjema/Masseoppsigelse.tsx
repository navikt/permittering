import React, {FunctionComponent, useContext} from "react";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";

export const Masseoppsigelse: FunctionComponent = () => {
    const {organisasjon} = useContext(OrganisasjonsListeContext);

    return (
        <div>
            <h1>Masseoppsigelse</h1>
        </div>
    );
}