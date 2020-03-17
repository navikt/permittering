import React, {FunctionComponent, useContext} from "react";
import "../komponenter/SkjemaRamme.less";
import Systemtittel from "nav-frontend-typografi/lib/systemtittel";
import Input from "nav-frontend-skjema/lib/input";
import Hovedknapp from "nav-frontend-knapper/lib/hovedknapp";
import Sidetittel from "nav-frontend-typografi/lib/sidetittel";
import SkjemaContext from "../SkjemaContext/SkjemaContext";
import {createSkjemaPath, SkjemaSideProps} from "../komponenter/SkjemaRamme";
import {useHistory} from "react-router-dom";

const Side1: FunctionComponent<SkjemaSideProps> = props => {
    const context = useContext(SkjemaContext);
    const history = useHistory();
    return (
        <>
            <Sidetittel>Kontaktinformasjon</Sidetittel>
            <Systemtittel className={"skjema-innhold__side-1-systemtittel"}>
                Informasjon om arbeidsgiver
            </Systemtittel>
            <Input
                className={"skjema-innhold__side-1-input-felt"}
                label="Bedriftens navn"
            />
            <div className={"skjema-innhold__side-1-linje-2"}>
                <Input
                    className={"skjema-innhold__side-1-input-felt"}
                    label="Bedriftsnummer"
                />
                <Input
                    className={"skjema-innhold__side-1-input-felt"}
                    label="Org. nr."
          defaultValue={context.skjema.orgNr}
          onChange={event =>
            context.endreSkjemaVerdi("orgNr", event.currentTarget.value)
          }
        />
      </div>
            <Systemtittel>Kontaktperson i virksomheten</Systemtittel>
            <div className={"skjema-innhold__side-1-linje-4"}>
                <Input
                    className={"skjema-innhold__side-1-input-felt"}
                    label="Navn"
                    defaultValue={context.skjema.kontaktNavn}
                    onChange={event =>
                        context.endreSkjemaVerdi("kontaktNavn", event.currentTarget.value)
                    }
                />
                <Input
                    className={"skjema-innhold__side-1-input-felt"}
                    label="Telefonnummer"
                    defaultValue={context.skjema.kontaktTlf}
                    onChange={event =>
                        context.endreSkjemaVerdi("kontaktTlf", event.currentTarget.value)
                    }
                />
            </div>
            <Hovedknapp onClick={async () => {
                await context.lagre()
                history.push(createSkjemaPath(props.nesteSide, context.skjema.id))
            }}>Lagre og gå videre</Hovedknapp>
        </>
  );
};

export default Side1;
