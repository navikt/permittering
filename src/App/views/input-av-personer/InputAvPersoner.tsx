import React, { useContext, useState } from "react";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import PersonTabell from "./komponenter/PersonTabell";
import LeggTilPersonerModal from "./komponenter/LeggTilPersonModal";
import SkjemaContext from "../../SkjemaContext/SkjemaContext";

const personerDummy = [
  {
    fnr: "28095638386",
    grad: 1,
    kommentar: "nothing",
    selected: false
  },
  {
    fnr: "21011011370",
    grad: 1,
    kommentar: "nothing",
    selected: false
  },
  {
    fnr: "11068419192",
    grad: 1,
    kommentar: "nothing",
    selected: false
  }
];

const InputAvPersoner = () => {
  const context = useContext(SkjemaContext);
  console.log("context", context);
  // Denne saken bør vel erstattes med context apiet
  const [mockPersoner, setPersoner] = useState(personerDummy);
  const [modalIsOpen, setModal] = useState(false);

  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const leggTilPersoner = (personer: Array<any>) => {
    personer.forEach(person => {
      const newPerson = {
        fnr: person.fnr,
        grad: 1,
        kommentar: "oppdatert",
        selected: false
      };
      let foundIndex = mockPersoner.findIndex(e => e.fnr === person.fnr);
      foundIndex > -1
        ? mockPersoner.splice(foundIndex, 1, newPerson)
        : mockPersoner.push(newPerson);
    });
    closeModal();
  };
  const fjernPersoner = (fnumbers: Array<string>) => {
    const personerCopy = [...mockPersoner];
    fnumbers.forEach(fnr => {
      let foundIndex = personerCopy.findIndex(e => e.fnr === fnr);
      personerCopy.splice(foundIndex, 1);
      console.log("trying to remove", foundIndex);
    });
    setPersoner(personerCopy);
  };
  const selectedPersons = () => {
    return mockPersoner.filter(e => e.selected).map(e => e.fnr);
  };
  return (
    <div className="input-av-personer">
      <h1>Hvem skal permitteres?</h1>
      <Hovedknapp onClick={() => openModal()}>Legg til personer</Hovedknapp>
      <Knapp
        disabled={selectedPersons().length === 0}
        onClick={() => fjernPersoner(selectedPersons())}
      >
        Slett ({selectedPersons().length})
      </Knapp>
      <Knapp onClick={() => context.endreSkjemaVerdi("personer", mockPersoner)}>
        Lagre og gå videre
      </Knapp>
      <LeggTilPersonerModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        leggTilPersoner={leggTilPersoner}
      />
      <PersonTabell personer={mockPersoner} setPersoner={setPersoner} />
    </div>
  );
};
export default InputAvPersoner;
