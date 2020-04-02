import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import PersonTabell from './komponenter/PersonTabell';
import LeggTilPersonerModal from './komponenter/LeggTilPersonModal';
import { Person } from '../../../types/permitteringsskjema';
import { useSkjemaSteg } from '../use-skjema-steg';
import './InputAvPersoner.less';
import { loggNavarendeSteg } from '../../../utils/funksjonerForAmplitudeLogging';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { selectedRows } from '../../komponenter/Skjema/utils';

const InputAvPersoner: FunctionComponent = () => {
    const history = useHistory();
    const context = useContext(SkjemaContext);
    if (context.skjema.sendtInnTidspunkt) {
        history.replace('/skjema/kvitteringsside');
    }
    let { personer = [] } = context.skjema;
    const selectedPersons = selectedRows(personer);
    const [modalIsOpen, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        loggNavarendeSteg('legg-til-personer');
    }, []);

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

    const { steg, forrigeSide, nesteSide } = useSkjemaSteg(
        history.location.pathname,
        context.skjema.id
    );

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

    const lagInfoTekstBasertPaSkjemaType = () => {
        const type = context.skjema.type;
        if (type === 'PERMITTERING_UTEN_LØNN') {
            return 'Fødselsnummer vil brukes i saksbehandlingen av søknad om dagpenger under permittering for den enkelte ansatte';
        } else {
            return 'Fødselsnummer vil brukes i saksbehandlingen for den enkelte ansatte.';
        }
    };

    const sjekkAntallAnsatte = () => {
        if (personer.length === 1) {
            return 'ansatt';
        }
        return 'ansatte';
    };

    const lagAntallAnsatteTekst = () => {
        if (selectedPersons.length) {
            return `${selectedPersons.length} av ${personer.length} ${sjekkAntallAnsatte()} valgt`;
        } else return `${personer.length} ${sjekkAntallAnsatte()} lagt til`;
    };

    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <div className="input-av-personer__overskrift-og-knapper">
                    <Systemtittel>{lagTekstBasertPaSkjemaType()}</Systemtittel>
                    <div className="input-av-personer__fram-og-tilbake">
                        <Knapp
                            mini
                            onClick={async () => {
                                await context.lagre();
                                history.push(forrigeSide);
                            }}
                        >
                            Tilbake
                        </Knapp>
                        <Hovedknapp
                            mini
                            onClick={async () => {
                                await context.lagre();
                                history.push(nesteSide);
                            }}
                            className="input-av-personer__mini-knapp-neste"
                        >
                            Neste
                        </Hovedknapp>
                    </div>
                </div>
                <Normaltekst className={'input-av-personer__infotekst'}>
                    {lagInfoTekstBasertPaSkjemaType()}
                </Normaltekst>
                <div className="input-av-personer__knapper-overst">
                    <Hovedknapp onClick={() => openModal()}>Legg til ansatte</Hovedknapp>
                    <div className="slett-knapp">
                        <Ingress className="antall-lagt-til">{lagAntallAnsatteTekst()}</Ingress>
                        <Knapp
                            disabled={selectedPersons.length === 0}
                            onClick={() => fjernPersoner(selectedPersons)}
                        >
                            Slett fra liste ({selectedPersons.length})
                        </Knapp>
                    </div>
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
                <div className="skjema-innhold__fram-og-tilbake">
                    <Knapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(forrigeSide);
                        }}
                    >
                        Tilbake
                    </Knapp>
                    <Hovedknapp
                        onClick={async () => {
                            await context.lagre();
                            history.push(nesteSide);
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
