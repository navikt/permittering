import React, {FunctionComponent, useContext} from "react";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";

export const InnskrenkningIArbeidstid: FunctionComponent = () => {
    const {organisasjon} = useContext(OrganisasjonsListeContext);

    return (
        <div>
            <h1>InnskrenkningIArbeidstid</h1>
        </div>
    );
}