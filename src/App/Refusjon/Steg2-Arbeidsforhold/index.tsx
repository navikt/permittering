import React, { FunctionComponent, useContext, useState } from 'react';
import RefusjonContext from '../RefusjonContext';
import { useHistory } from 'react-router-dom';
import { useRefusjonSteg } from '../use-refusjon-steg';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import { Systemtittel } from 'nav-frontend-typografi';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import LeggTilArbeidsforholdModal from './LeggTilArbeidsforholdModal';
import { selectedRows } from '../../komponenter/Skjema/utils';
import { Arbeidsforhold as ArbeidsforholdType } from '../../../types/refusjonsskjema';
import ArbeidsforholdTabell from './ArbeidsforholdTabell';

const Arbeidsforhold: FunctionComponent = () => {
    const context = useContext(RefusjonContext);
    const history = useHistory();
    let { arbeidsforhold = [] } = context.skjema;
    const selectedPersons = selectedRows(arbeidsforhold);
    const { steg } = useRefusjonSteg(history.location.pathname, context.skjema.id);
    const [modalIsOpen, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);
    const fjernArbeidsforhold = () => {};
    const leggTilArbeidsforhold = (arbeidsforhold: ArbeidsforholdType[]) => {
        context.endreSkjemaVerdi('arbeidsforhold', arbeidsforhold);
    };
    return (
        <>
            <Dekorator sidetittel={context.skjema.type} />
            <SkjemaRamme
                steg={steg}
                lagre={async () => await context.lagre()}
                slett={async () => await context.avbryt()}
            >
                <Systemtittel>Arbeidsforhold</Systemtittel>
                <div className="input-av-personer__knapper-overst">
                    <Hovedknapp onClick={() => openModal()}>Legg til ansatte</Hovedknapp>
                    <div className="slett-knapp">
                        {/*<Ingress className="antall-lagt-til">{'dummy tekst'}</Ingress>*/}
                        <Knapp
                            disabled={selectedPersons.length === 0}
                            onClick={fjernArbeidsforhold}
                        >
                            Slett fra liste ({selectedPersons.length})
                        </Knapp>
                    </div>
                </div>
                <LeggTilArbeidsforholdModal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    leggTil={leggTilArbeidsforhold}
                />
                <Knapp onClick={context.lagre}>Lagre</Knapp>
                <ArbeidsforholdTabell
                    rows={context.skjema.arbeidsforhold ?? []}
                    setRows={() => {}}
                    beregninger={context.beregninger}
                />
            </SkjemaRamme>
        </>
    );
};
export default Arbeidsforhold;
