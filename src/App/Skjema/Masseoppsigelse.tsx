import React, {FunctionComponent, useState} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {Oppsummering} from "./Oppsummering";
import {Skjema} from "./Skjema";

export const Masseoppsigelse: FunctionComponent = () => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();

    // TODO: send inn til nytt endepunkt
    // lag nytt mock endepunkt for sendinn v2

    return <Side tittel="Permittering uten lønn">
        <Breadcrumbs breadcrumb={{
            url: '/skjema/MASSEOPPSIGELSE',
            title: 'Masseoppsigelse'
        }}/>
        {
            validertSkjema
                ? <Oppsummering
                    skjema={validertSkjema}
                    onTilbake={() => setValidertSkjema(undefined)}
                    onSendInn={(skjema) => console.log(skjema)}
                />

                : <Skjema
                    skjemaType='MASSEOPPSIGELSE'
                    onSkjemaValidert={setValidertSkjema}
                />
        }
    </Side>;
}