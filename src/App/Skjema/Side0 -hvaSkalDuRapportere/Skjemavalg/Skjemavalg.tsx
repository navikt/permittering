import React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { loggSkjemaValg } from '../../../../utils/funksjonerForAmplitudeLogging';
import { Permitteringsskjema } from '../../../../types/permitteringsskjema';
import '../HvaSkalDuRapportere.less';

const radios = [
    {
        label: (
            <>
                <Normaltekst className="bold">Permitteringer uten lønn</Normaltekst>
                <Normaltekst>
                    Arbeidsgiver pålegger arbeidstaker et midlertidig fritak uten lønn.
                </Normaltekst>
            </>
        ),
        value: 'PERMITTERING_UTEN_LØNN',
        id: 'permittering',
    },
    {
        label: (
            <>
                <Normaltekst className="bold">Masseoppsigelser</Normaltekst>
                <Normaltekst>
                    Arbeidsforholdet mellom arbeidsgiver og arbeidstaker avsluttes.
                </Normaltekst>
            </>
        ),
        value: 'MASSEOPPSIGELSE',
        id: 'masseoppsigelser',
    },
    {
        label: (
            <>
                <Normaltekst className="bold">Innskrenkning i arbeidstid</Normaltekst>
                <Normaltekst>Arbeidstakerens stillingsprosent blir redusert.</Normaltekst>
            </>
        ),
        value: 'INNSKRENKNING_I_ARBEIDSTID',
        id: 'innskrenkning',
    },
];

interface Props {
    skjemaType: Permitteringsskjema['type'] | undefined;
    setSkjemaType: (skjema: Permitteringsskjema['type']) => void;
}

const Skjemavalg = ({ skjemaType, setSkjemaType }: Props) => {
    loggSkjemaValg('hva-skal-du-varsle-om');

    return (
        <>
            <Undertittel className="skjemavalg-overskrift">Hva vil du melde til NAV?</Undertittel>
            <RadioPanelGruppe
                name="samplename"
                legend=""
                radios={radios}
                checked={skjemaType}
                onChange={(event, value) => {
                    setSkjemaType(value);
                    loggSkjemaValg(value);
                }}
            />
        </>
    );
};

export default Skjemavalg;
