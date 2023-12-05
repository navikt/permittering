import React, {FunctionComponent, useState} from "react";
import {Permitteringsskjema, Yrkeskategori} from "../../types/Permitteringsskjema";
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {Oppsummering} from "./Oppsummering";
import {Skjema, SkjemaFormDataType} from "./Skjema";
import {useLagreSkjema} from "../../api/permittering-api";

export const InnskrenkningIArbeidstid: FunctionComponent = () => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();
    const [skjema, setSkjema] = useState<SkjemaFormDataType>(
        {
            type: 'INNSKRENKNING_I_ARBEIDSTID',
            yrkeskategorier: [] as Yrkeskategori[]
        } as SkjemaFormDataType
    );
    const {lagreSkjema, error} = useLagreSkjema();

    // TODO: vis error ved feil og naviger til kvittering ved success

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
                    onSendInn={lagreSkjema}
                />

                : <Skjema
                    skjema={skjema}
                    setSkjema={setSkjema}
                    onSkjemaValidert={setValidertSkjema}
                />
        }
    </Side>;
}