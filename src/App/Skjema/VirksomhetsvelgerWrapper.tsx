import React, {FunctionComponent, useCallback, useContext} from "react";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";
import {Virksomhetsvelger} from "@navikt/bedriftsmeny";
import {Organisasjon} from "@navikt/bedriftsmeny/src/bedriftsmeny/organisasjon";

type Props = {
    onOrganisasjonChange: (organisasjon: Organisasjon) => void;
}
export const VirksomhetsvelgerWrapper: FunctionComponent<Props> = ({onOrganisasjonChange}) => {
    const {organisasjoner, organisasjon, setOrganisasjon} = useContext(OrganisasjonsListeContext);
    const useOrgnrHook: () => [string | null, (orgnr: string) => void] = useCallback(() => {
        const currentOrgnr = organisasjon.OrganizationNumber;
        return [
            currentOrgnr,
            (orgnr: string) => {
                const org = organisasjoner.find(({OrganizationNumber}) => OrganizationNumber === orgnr);
                if (org !== undefined) {
                    setOrganisasjon(org);
                }
            },
        ];
    }, [organisasjon, setOrganisasjon]);

    return <Virksomhetsvelger
        organisasjoner={organisasjoner}
        onOrganisasjonChange={onOrganisasjonChange}
        orgnrSearchParam={useOrgnrHook}
    />
}