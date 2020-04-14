import React from 'react';
import 'nav-frontend-tabell-style';
import { Arbeidsforhold } from '../../../types/refusjonsskjema';
import { getFnrReadableString } from '../../../utils/fnrFunksjoner';
import { Checkbox } from 'nav-frontend-skjema';

interface ArbeidsforholdTabellProps {
    rader: Arbeidsforhold[];
    valgteRader: Set<string>;
    setValgteRader: (valgteRader: Set<string>) => void;
}

const beregningsdetaljerTekst = (beregningsdetaljer: Arbeidsforhold['beregningsdetaljer']) => {
    const meldinger = {
        SEKS_G: '6G',
        FEILET: 'Feilet',
    };

    return beregningsdetaljer.map(detalj => meldinger[detalj]).join(', ');
};

// https://github.com/navikt/eessi-pensjon-ui/blob/master/src/components/TableSorter/TableSorter.tsx
const ArbeidsforholdTabell: React.FunctionComponent<ArbeidsforholdTabellProps> = props => {
    const toggleRad = (rad: Arbeidsforhold) => {
        const nyeValgteRader = new Set(props.valgteRader);
        if (props.valgteRader.has(rad.fnr)) {
            nyeValgteRader.delete(rad.fnr);
        } else {
            nyeValgteRader.add(rad.fnr);
        }
        props.setValgteRader(nyeValgteRader);
    };

    return (
        <table className="input-av-personer__tabell tabell">
            <thead>
                <tr>
                    <th className="kolonneheader-checkbox">
                        <Checkbox
                            checked={
                                props.rader.length > 0 &&
                                props.valgteRader.size === props.rader.length
                            }
                            onChange={event =>
                                props.setValgteRader(
                                    new Set(
                                        event.currentTarget.checked
                                            ? props.rader.map(rad => rad.fnr)
                                            : []
                                    )
                                )
                            }
                            label={'Velg alle'}
                        />
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Fnr
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Kjønn, alder
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Perm. grad
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Periode
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Innhentet inntekt
                    </th>
                    <th />
                    <th role="columnheader" aria-sort="none">
                        Beregnet refusjon
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.rader.map(rad => {
                    return (
                        <tr key={'rad' + rad.fnr}>
                            <td>
                                <Checkbox
                                    label="Velg denne raden"
                                    checked={props.valgteRader.has(rad.fnr)}
                                    onChange={() => toggleRad(rad)}
                                />
                            </td>
                            <td>{rad.fnr}</td>
                            <td>{getFnrReadableString(rad.fnr)}</td>
                            <td>{rad.gradering}</td>
                            <td>{rad.periodeStart + ' - ' + rad.periodeSlutt}</td>
                            <td>{rad.inntektInnhentet}</td>
                            <td>{beregningsdetaljerTekst(rad.beregningsdetaljer)}</td>
                            <td>{rad.refusjonsbeløp}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ArbeidsforholdTabell;
