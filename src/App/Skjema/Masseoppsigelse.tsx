import React, {FunctionComponent, useState} from "react";
import {Permitteringsskjema, Yrkeskategori} from "../../types/Permitteringsskjema";
import {Side} from "../Side";
import {Breadcrumbs} from "./Breadcrumbs";
import {Oppsummering} from "./Oppsummering";
import {sidetitler, Skjema, SkjemaFormDataType} from "./Skjema";
import {useLagreSkjema} from "../../api/permittering-api";

export const Masseoppsigelse: FunctionComponent = () => {
    const [validertSkjema, setValidertSkjema] = useState<Permitteringsskjema>();
    const [skjema, setSkjema] = useState<SkjemaFormDataType>(
        {
            type: 'MASSEOPPSIGELSE',
            yrkeskategorier: [] as Yrkeskategori[]
        } as SkjemaFormDataType
    );
    const {lagreSkjema, error} = useLagreSkjema();

    // TODO: vis error ved feil og naviger til kvittering ved success

    return <Side tittel={sidetitler[skjema.type]}>
        <Breadcrumbs breadcrumb={{
            url: `/skjema/${skjema.type}`,
            title: sidetitler[skjema.type]
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