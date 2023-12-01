import {FunctionComponent, useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";
import {Permitteringsskjema} from "../../types/permitteringsskjema";

export const PermitteringUtenLønn: FunctionComponent = () => {
    const { organisasjoner } = useContext(OrganisasjonsListeContext);

    return (
        <div>
            <h1>PermitteringUtenLønn</h1>
        </div>
    );
}

export const Masseoppsigelse: FunctionComponent = () => {
    const { organisasjoner } = useContext(OrganisasjonsListeContext);

    return (
        <div>
            <h1>Masseoppsigelse</h1>
        </div>
    );
}

export const InnskrenkningIArbeidstid: FunctionComponent = () => {
    const { organisasjoner } = useContext(OrganisasjonsListeContext);

    return (
        <div>
            <h1>InnskrenkningIArbeidstid</h1>
        </div>
    );
}

export const KvitteringV2: FunctionComponent = () => {
    const { skjemaId } = useParams();
    // TODO: useSkjema swr med hent fra backend
    return (
        <div>
            <h1>KvitteringV2: {skjemaId}</h1>
        </div>
    );
}

const OppsummeringV2: FunctionComponent<{ skjema: Permitteringsskjema}> = ({skjema}) => {
    // viser oppsummering før innsending. Ingen egen route
    return (
        <div>
            <h1>OppsummeringV2</h1>
        </div>
    );
}