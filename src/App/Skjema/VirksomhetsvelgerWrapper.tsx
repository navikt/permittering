import React, {FunctionComponent, useContext} from "react";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";
import { Organisasjon, Virksomhetsvelger } from '@navikt/virksomhetsvelger';



type Props = {
    onOrganisasjonChange: (organisasjon: Organisasjon) => void;
}
export const VirksomhetsvelgerWrapper: FunctionComponent<Props> = ({onOrganisasjonChange}) => {
    const {organisasjoner, organisasjon, setOrganisasjon} = useContext(OrganisasjonsListeContext);

    return <Virksomhetsvelger
        friKomponent
        organisasjoner={organisasjoner}
        onChange={(e) => {
            if (e.orgnr === organisasjon?.orgnr) {
                return
            }
            setOrganisasjon(e)
            onOrganisasjonChange(e)
        }}
    />
}