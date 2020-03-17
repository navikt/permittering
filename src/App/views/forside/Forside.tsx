import React from "react";
import SkjemaTabell from "./komponenter/SkjemaTabell";
import HvitSideBoks from "../../komponenter/HvitSideBoks";
import {Undertittel} from "nav-frontend-typografi";

const dummySkjemaer = [
    {
        id: "3a30b012-f73f-4333-822c-04ce290f2685",
        orgnr: "123",
        navn: "Andersens IT-tjenester",
        antallBerort: 123
    },
    {
        id: "75dc295a-d72e-485b-a286-146e53667885",
        orgnr: "123",
        navn: "Pettersens Sko",
        antallBerort: 123
    }
]
const Forside = () => {
    return (
        <HvitSideBoks>
            <Undertittel>Eksisterende varsler</Undertittel>
            <SkjemaTabell skjemaer={dummySkjemaer}/>
        </HvitSideBoks>
    );
}
export default Forside;
