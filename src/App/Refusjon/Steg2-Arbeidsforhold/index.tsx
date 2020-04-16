import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Ingress, Systemtittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    hentArbeidsforhold,
    leggTilArbeidsforhold,
    slettArbeidsforhold,
} from '../../../api/refusjon-api';
import { Paginering, tomPaginering } from '../../../types/paginering';
import {
    Arbeidsforhold as ArbeidsforholdType,
    LeggTilArbeidsforhold,
} from '../../../types/refusjonsskjema';
import { useInterval } from '../../../utils/useInterval';
import Dekorator from '../../komponenter/Dekorator/Dekorator';
import SkjemaRamme from '../../komponenter/SkjemaRamme';
import RefusjonContext from '../RefusjonContext';
import { useRefusjonSteg } from '../use-refusjon-steg';
import ArbeidsforholdTabell from './ArbeidsforholdTabell';
import LeggTilArbeidsforholdModal from './LeggTilArbeidsforholdModal';

const Arbeidsforhold: FunctionComponent = () => {
    const context = useContext(RefusjonContext);
    const history = useHistory();
    const [arbeidsforhold, setArbeidsforhold] = useState<Paginering<ArbeidsforholdType>>(
        tomPaginering
    );
    const [valgteRader, setValgteRader] = useState<Set<string>>(new Set());
    const { steg } = useRefusjonSteg(history.location.pathname, context.skjema.id);
    const [modalIsOpen, setModal] = useState(false);
    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const hentOgSettArbeidsforhold = useCallback(
        () => hentArbeidsforhold(context.skjema.id, 'fnr', 100, 0).then(setArbeidsforhold),
        [context.skjema.id]
    );

    const leggTilArbeidsforholdOnClick = (
        data: Omit<LeggTilArbeidsforhold, 'refusjonsskjemaId'>
    ) => {
        leggTilArbeidsforhold({ refusjonsskjemaId: context.skjema.id, ...data }).then(
            hentOgSettArbeidsforhold
        );
    };

    const slettValgteArbeidsforhold = () => {
        slettArbeidsforhold(Array.from(valgteRader)).then(() => {
            setValgteRader(new Set());
            hentOgSettArbeidsforhold();
        });
    };

    useEffect(() => {
        if (context.skjema.id) {
            hentOgSettArbeidsforhold();
        }
    }, [context.skjema.id, hentOgSettArbeidsforhold]);

    const harUbehandledeBeregninger = arbeidsforhold.content.some(
        a => !a.inntektInnhentet && !a.beregningsdetaljer.some(a => a === 'FEILET')
    );
    const fetchIntervallArbeidsforhold = harUbehandledeBeregninger ? 2_000 : 60_000;
    useInterval(hentOgSettArbeidsforhold, fetchIntervallArbeidsforhold);

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
                        <Ingress className="antall-lagt-til">
                            Totalt antall: {arbeidsforhold.totalElements}
                        </Ingress>
                        <Knapp
                            disabled={valgteRader.size === 0}
                            onClick={slettValgteArbeidsforhold}
                        >
                            Slett fra liste ({valgteRader.size})
                        </Knapp>
                    </div>
                </div>
                <LeggTilArbeidsforholdModal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    leggTil={leggTilArbeidsforholdOnClick}
                />
                <ArbeidsforholdTabell
                    rader={arbeidsforhold.content}
                    valgteRader={valgteRader}
                    setValgteRader={setValgteRader}
                />
            </SkjemaRamme>
        </>
    );
};
export default Arbeidsforhold;
