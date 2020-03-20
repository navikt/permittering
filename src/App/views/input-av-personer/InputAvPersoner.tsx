import React, { FunctionComponent, useContext, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import PersonTabell from './komponenter/PersonTabell';
import LeggTilPersonerModal from './komponenter/LeggTilPersonModal';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { useHistory } from 'react-router-dom';
import { Person } from '../../../types/permitteringsskjema';
import './InputAvPersoner.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { forrigeSide, nesteSide, SkjemaSideProps, skjemaSteg } from '../../Skjema/skjema-steg';
import Banner from '../../HovedBanner/HovedBanner';

const InputAvPersoner: FunctionComponent<SkjemaSideProps> = () => {
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
                kommentar: 'oppdatert',
                selected: false,
            };
            let foundIndex = personerCopy.findIndex(e => e.fnr === person.fnr);
            foundIndex > -1
                ? personerCopy.splice(foundIndex, 1, newPerson)
                : personerCopy.push(newPerson);
        });
        context.endreSkjemaVerdi('personer', personerCopy);
        closeModal();
    };
    const fjernPersoner = (fnumbers: Array<string>) => {
        const personerCopy = [...personer];
        fnumbers.forEach(fnr => {
            let foundIndex = personerCopy.findIndex(e => e.fnr === fnr);
            personerCopy.splice(foundIndex, 1);
        });
        context.endreSkjemaVerdi('personer', personerCopy);
    };
    const selectedPersons = () => {
        return personer.filter(e => e.selected).map(e => e.fnr);
    };
    const steg = skjemaSteg(history.location.pathname);
    const nestePath = nesteSide(steg, context.skjema.id);
    const forrigePath = forrigeSide(steg, context.skjema.id);

    const lagTekstBasertPaSkjemaType = () => {
        const type = context.skjema.type;
        switch (true) {
            case type === 'MASSEOPPSIGELSE':
                return 'Hvem skal sies opp?';
            case type === 'PERMITTERING_UTEN_LØNN':
                return 'Hvem skal permitteres?';
            case type === 'INNSKRENKNING_I_ARBEIDSTID':
                return 'Hvem sin arbeidstid skal innskrenkes?';
        }
        return 'Hvem skal permitteres?';
    };

    return (
        <>
            <Banner sidetittel={context.skjema.type} />
            <SkjemaRamme>
                <div className={'input-av-personer__overskrift-og-knapper'}>
                    <Systemtittel>{lagTekstBasertPaSkjemaType()}</Systemtittel>
                    <div className={'input-av-personer__fram-og-tilbake'}>
                        <Knapp
                            mini
                            onClick={async () => {
                                await context.lagre();
                                history.push(forrigePath || '');
                            }}
                        >
                            Tilbake
                        </Knapp>
                        <Hovedknapp
                            mini
                            onClick={async () => {
                                await context.lagre();
                                history.push(nestePath || '');
                            }}
                            className={'input-av-personer__mini-knapp-neste'}
                        >
                            Neste
                        </Hovedknapp>
                    </div>
                </div>
                <div className={'input-av-personer__knapper-overst'}>
                    <Hovedknapp onClick={() => openModal()}>Legg til ansatte</Hovedknapp>
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
                        context.endreSkjemaVerdi('personer', personer)
                    }
                />
                <div className={'skjema-innhold__fram-og-tilbake'}>
                    <Knapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(forrigePath || '');
                        }}
                    >
                        Tilbake
                    </Knapp>
                    <Hovedknapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(nestePath || '');
                        }}
                    >
                        Neste
                    </Hovedknapp>
                </div>
            </SkjemaRamme>
        </>
    );
};
export default InputAvPersoner;
