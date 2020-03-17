import React, { useState } from "react";
import Modal from "nav-frontend-modal";
import { Knapp } from "nav-frontend-knapper";
import {
  Normaltekst,
  UndertekstBold,
  Undertittel
} from "nav-frontend-typografi";
import { Textarea } from "nav-frontend-skjema";
// @ts-ignore
import validator from "@navikt/fnrvalidator";

interface LeggTilPersonerModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  leggTilPersoner: (nyPersoner: Array<any>) => void;
}

const extractFnrFromString = (str: string) => {
  const output = [];
  const regex = /[+-]?\d+(?:\.\d+)?/g;
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(str))) {
    const result = validator.idnr(match[0]);
    if (result.status === "valid") {
      output.push({
        fnr: match[0],
        type: result.type
      });
    }
  }
  return output;
};
const LeggTilPersonerModal: React.FunctionComponent<LeggTilPersonerModalProps> = ({
  modalIsOpen,
  closeModal,
  leggTilPersoner
}) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  const [fnrCount, setFnrCount] = useState(0);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeButton={true}
      contentLabel="Min modalrute"
    >
      <div style={{ padding: "2rem 2.5rem", overflow: "hidden" }}>
        <Undertittel>Legg til permitterte ansatte</Undertittel>
        <UndertekstBold>
          Lim inn fødselsnummeret til de som skal permitteres
        </UndertekstBold>
        <Normaltekst>
          <ul>
            <li>Du kan lime inn alle på en gang</li>
            <li>
              Du kan lime inn alt innholdet i et excel ark så luker vi ut hva
              som er fødselsnummer
            </li>
          </ul>
        </Normaltekst>
        <Textarea
          style={{ maxHeight: "300px" }}
          maxLength={0}
          label="Berørte personer"
          value={textAreaContent}
          onChange={e => {
            const numbers = extractFnrFromString(e.target.value);
            setFnrCount(numbers.length);
            setTextAreaContent(e.target.value);
          }}
        />
        {fnrCount > 0 && (
          <Normaltekst>Finner totalt {fnrCount} personer.</Normaltekst>
        )}
      </div>
      <Knapp
        disabled={fnrCount === 0}
        onClick={() => {
          leggTilPersoner(extractFnrFromString(textAreaContent));
          setTextAreaContent("");
          setFnrCount(0);
        }}
      >
        Legg til personer i lista
      </Knapp>
    </Modal>
  );
};

export default LeggTilPersonerModal;
