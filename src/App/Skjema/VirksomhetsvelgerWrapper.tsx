import React, {FunctionComponent, useCallback, useContext} from "react";
import {OrganisasjonsListeContext} from "../OrganisasjonslisteProvider";
import {Label} from "@navikt/ds-react";
import {Virksomhetsvelger} from "@navikt/bedriftsmeny";

export const VirksomhetsvelgerWrapper: FunctionComponent = () => {
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

    return <>
        <Label size="medium" htmlFor="virksomhetsvelger">Velg virksomhet (underenhet)</Label>
        <div id="virksomhetsvelger">
            <Virksomhetsvelger
                organisasjoner={organisasjoner}
                onOrganisasjonChange={setOrganisasjon}
                orgnrSearchParam={useOrgnrHook}
            />
        </div>
    </>
}