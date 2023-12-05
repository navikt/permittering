import React, {FunctionComponent, useState} from "react";
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Oppsummering} from "./Oppsummering";
import {Skjema} from "./Skjema";

export const PermitteringUtenLønn: FunctionComponent = () => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();

    // TODO: send inn til nytt endepunkt
    // lag nytt mock endepunkt for sendinn v2

    return <Side tittel="Permittering uten lønn">
        <Breadcrumbs breadcrumb={{
            url: '/skjema/PERMITTERING_UTEN_LØNN',
            title: 'Permittering uten lønn'
        }}/>
        {
            validertSkjema
                ? <Oppsummering
                    skjema={validertSkjema}
                    onTilbake={() => setValidertSkjema(undefined)}
                    onSendInn={(skjema) => console.log(skjema)}
                />

                : <Skjema
                    skjemaType='PERMITTERING_UTEN_LØNN'
                    onSkjemaValidert={setValidertSkjema}
                />
        }
    </Side>;
}