import React, { FunctionComponent, useContext, useState } from "react";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import PersonTabell from "./komponenter/PersonTabell";
import LeggTilPersonerModal from "./komponenter/LeggTilPersonModal";
import SkjemaContext from "../../SkjemaContext/SkjemaContext";
import {
  createSkjemaPath,
  SkjemaSideProps
} from "../../komponenter/SkjemaRamme";
import { useHistory } from "react-router-dom";
import { Person } from "../../../types/permitteringsskjema";
import "./InputAvPersoner.less";

const InputAvPersoner: FunctionComponent<SkjemaSideProps> = props => {
  const context = useContext(SkjemaContext);
  let { personer = [] } = context.skjema;
  const history = useHistory();
  const [modalIsOpen, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const leggTilPersoner = (nyePersoner: Array<any>) => {
    const personerCopy = [...personer];
    nyePersoner.forEach(person => {
      const newPerson = {
        fnr: person.fnr,
        grad: 1,
        kommentar: "oppdatert",
        selected: false
      };
      let foundIndex = personerCopy.findIndex(e => e.fnr === person.fnr);
      foundIndex > -1
        ? personerCopy.splice(foundIndex, 1, newPerson)
        : personerCopy.push(newPerson);
    });
    context.endreSkjemaVerdi("personer", personerCopy);
    closeModal();
  };
  const fjernPersoner = (fnumbers: Array<string>) => {
    const personerCopy = [...personer];
    fnumbers.forEach(fnr => {
      let foundIndex = personerCopy.findIndex(e => e.fnr === fnr);
      personerCopy.splice(foundIndex, 1);
    });
    context.endreSkjemaVerdi("personer", personerCopy);
  };
  const selectedPersons = () => {
    return personer.filter(e => e.selected).map(e => e.fnr);
  };
  return (
    <div className="input-av-personer">
      <h1>Hvem skal permitteres?</h1>
      <div className={"input-av-personer__knapper-overst"}>
        <Hovedknapp onClick={() => openModal()}>
          Legg til permitterte ansatte
        </Hovedknapp>
        <Knapp
          disabled={selectedPersons().length === 0}
          onClick={() => fjernPersoner(selectedPersons())}
        >
          Slett fra liste ({selectedPersons().length})
        </Knapp>
      </div>
      <LeggTilPersonerModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        leggTilPersoner={leggTilPersoner}
      />
      <PersonTabell
        personer={personer}
        setPersoner={(personer: Person[]) =>
          context.endreSkjemaVerdi("personer", personer)
        }
      />
      <div className={"skjema-innhold__fram-og-tilbake"}>
        <Knapp>Tilbake</Knapp>

        <Knapp
          onClick={async () => {
            await context.lagre();
            history.push(createSkjemaPath(props.nesteSide, context.skjema.id));
          }}
        >
          Neste
        </Knapp>
      </div>
    </div>
  );
};
export default InputAvPersoner;
