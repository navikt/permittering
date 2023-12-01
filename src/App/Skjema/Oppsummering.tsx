import React, {FunctionComponent} from "react";
import {Permitteringsskjema} from "../../types/permitteringsskjema";

export const Oppsummering: FunctionComponent<{ skjema: Permitteringsskjema }> = ({skjema}) => {
    // viser oppsummering før innsending. Ingen egen route
    return (
        <div>
            <h1>Oppsummering</h1>
        </div>
    );
}