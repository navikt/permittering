import React, {FunctionComponent, useState} from "react";
import {Permitteringsskjema} from "../../types/Permitteringsskjema";
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {Oppsummering} from "./Oppsummering";
import {Skjema} from "./Skjema";

export const InnskrenkningIArbeidstid: FunctionComponent = () => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();

    // TODO: send inn til nytt endepunkt
    // lag nytt mock endepunkt for sendinn v2

    return <Side tittel="Permittering uten lønn">
        <Breadcrumbs breadcrumb={{
            url: '/skjema/INNSKRENKNING_I_ARBEIDSTID',
            title: 'Innskrenkning i arbeidstid'
        }}/>
        {
            validertSkjema
                ? <Oppsummering
                    skjema={validertSkjema}
                    onTilbake={() => setValidertSkjema(undefined)}
                    onSendInn={(skjema) => console.log(skjema)}
                />

                : <Skjema
                    skjemaType='INNSKRENKNING_I_ARBEIDSTID'
                    onSkjemaValidert={setValidertSkjema}
                />
        }
    </Side>;
}