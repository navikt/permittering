import React, { FunctionComponent } from 'react';

import './MobilVisning.less';
import { erGyldigNr, InputfeltState } from '../OppgiAntallBerorte';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import { Organisasjon } from '../../../../types/Organisasjon';
import Input from 'nav-frontend-skjema/lib/input';
import { Normaltekst, Element } from 'nav-frontend-typografi';

interface Props {
    setInputfeltStates: (states: InputfeltState[]) => void;
    inputFeltStatesKopi: InputfeltState[];
    leggTilEllerFjernBedrift: (orgnr: string, navn: string) => void;
    organisasjon: Organisasjon;
    endreBedrift: (orgnr: string, antall: number, navn: string) => void;
    key: string;
}

const MobilInputfelt: FunctionComponent<Props> = (props: Props) => {
    const indeksIinputfeltState: number = props.inputFeltStatesKopi.findIndex(
        (state: InputfeltState) => state.organisasjonsnr === props.organisasjon.OrganizationNumber
    );

    const gjeldendeState = props.inputFeltStatesKopi[indeksIinputfeltState];

    return (
        <div className={'mobilInputfelt'}>
            <div className={'mobilInputfelt__rad'}>
                <Checkbox
                    label={
                        <Element className={'mobilInputfelt__checkbokslabel'}>Virksomhet</Element>
                    }
                    checked={gjeldendeState.skalVises}
                    className={'mobilInputfelt__checkboks'}
                    onChange={() => {
                        props.inputFeltStatesKopi[
                            indeksIinputfeltState
                        ].skalVises = !gjeldendeState.skalVises;
                        props.setInputfeltStates(props.inputFeltStatesKopi);
                        props.leggTilEllerFjernBedrift(
                            props.organisasjon.OrganizationNumber,
                            props.organisasjon.Name
                        );
                    }}
                />
                <Normaltekst className={'mobilInputfelt__verdi mobilInputfelt__organisasjon'}>
                    {props.organisasjon.Name}
                </Normaltekst>
                <Normaltekst className={'mobilInputfelt__verdi'}>
                    {props.organisasjon.OrganizationNumber}
                </Normaltekst>
            </div>
            <div className={'mobilInputfelt__rad'}>
                <Element className={'mobilInputfelt__verdi'}>Antall berørte</Element>
                {gjeldendeState.skalVises && (
                    <Input
                        value={gjeldendeState.antall}
                        feil={gjeldendeState.feilmelding}
                        className={'mobilInputfelt__verdi mobilInputfelt__inputfelt'}
                        placeholder={'Fyll inn antall'}
                        id={'inputfelt-' + props.organisasjon.OrganizationNumber}
                        onChange={(event: any) => {
                            if (
                                !erGyldigNr(event.currentTarget.value) &&
                                event.currentTarget.value !== ''
                            ) {
                                props.inputFeltStatesKopi[indeksIinputfeltState].feilmelding =
                                    'Fyll inn antall';
                            } else {
                                props.inputFeltStatesKopi[indeksIinputfeltState].feilmelding = '';
                                props.endreBedrift(
                                    props.organisasjon.OrganizationNumber,
                                    parseInt(event.currentTarget.value),
                                    props.organisasjon.Name
                                );
                            }
                            props.setInputfeltStates(props.inputFeltStatesKopi);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default MobilInputfelt;
