import React, { useState } from 'react';
import Modal from 'nav-frontend-modal';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Input, Textarea } from 'nav-frontend-skjema';
import './LeggTilArbeidsforholdModal.less';
import { extractFnrFromString } from '../../../utils/fnrFunksjoner';
import { LeggTilArbeidsforhold } from '../../../types/refusjonsskjema';

interface LeggTilPersonerModalProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    leggTil: (data: Omit<LeggTilArbeidsforhold, 'refusjonsskjemaId'>) => void;
}

const LeggTilArbeidsforholdModal: React.FunctionComponent<LeggTilPersonerModalProps> = ({
    modalIsOpen,
    closeModal,
    leggTil,
}) => {
    const [textAreaContent, setTextAreaContent] = useState('');
    const [gradering, setGradering] = useState('');
    const [fnrCount, setFnrCount] = useState(0);
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            closeButton={true}
            contentLabel="Min modalrute"
        >
            <div className="legg-til-person-modal__container">
                <Undertittel className="legg-til-person-modal__undertittel">
                    Hvem berøres?
                </Undertittel>
                <Element>Lim inn fødselsnummer til de som berøres</Element>
                <Normaltekst>
                    <ul>
                        <li>Du kan lime inn ett eller flere fødselsnummer på en gang</li>
                        <li>
                            Fødselsnummer må kun inneholde tall og være uten mellomrom eller andre
                            tegn
                        </li>
                        <li>
                            Du kan for eksempel lime inn alt innholdet i et Excel-ark så luker vi ut
                            hva som er fødselsnummer
                        </li>
                    </ul>
                </Normaltekst>
                <Textarea
                    style={{ maxHeight: '300px', marginBottom: '0.5px' }}
                    maxLength={0}
                    label="Berørte personer"
                    value={textAreaContent}
                    placeholder={'Lim inn her'}
                    onChange={e => {
                        const numbers = extractFnrFromString(e.target.value);
                        setFnrCount(numbers.length);
                        setTextAreaContent(e.target.value);
                    }}
                />
                <Input
                    label={'Gradering'}
                    bredde="L"
                    defaultValue={gradering}
                    onChange={e => {
                        setGradering(e.currentTarget.value);
                    }}
                />
                {fnrCount > 0 && (
                    <Normaltekst className="antall-gyldige-fnr">
                        Finner {fnrCount} gyldige fødselsnummer.
                    </Normaltekst>
                )}
                <Knapp
                    className={'legg-til-person-modal__legg-til-knapp'}
                    disabled={fnrCount === 0}
                    onClick={() => {
                        const fnr = extractFnrFromString(textAreaContent).map(object => object.fnr);
                        leggTil({
                            fnr,
                            gradering: parseInt(gradering),
                            periodeStart: '2020-03-01',
                            periodeSlutt: '2020-03-31',
                        });
                        setTextAreaContent('');
                        setFnrCount(0);
                    }}
                >
                    Legg til personer i lista
                </Knapp>
            </div>
        </Modal>
    );
};

export default LeggTilArbeidsforholdModal;
