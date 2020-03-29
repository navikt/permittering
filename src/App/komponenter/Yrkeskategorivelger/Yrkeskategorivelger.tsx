import React, { FunctionComponent, useContext, useState } from 'react';
import { stringify } from 'querystring';
import Autocomplete from '@navikt/nap-autocomplete';
import { Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import YrkeskategoriValgt from './YrkeskategoriValgteYrker';
import { stillingstitlerPath } from '../../../paths.json';
import './Yrkeskategorivelger.less';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';

const getUpdatedSuggestions = async (path: string, q: string) => {
    const result = await fetch(path + '?' + stringify({ q }));
    const data = await result.json();
    const suggestions: { key: any; value: any; styrk08: any }[] = [];

    data.forEach((d: any) => {
        suggestions.push({
            key: d.konseptId,
            value: d.label,
            styrk08: d.styrk08,
        });
    });
    return suggestions;
};

export const Yrkeskategorivelger: FunctionComponent<any> = props => {
    // const context = useContext(SkjemaContext);
    const [suggestions, setSuggestions] = useState<any>([]);
    const [value, setValue] = useState('');
    const [selected, setSelected] = React.useState<any[]>([]);

    /* const leggTilYrke = (nyYrkeskategori: array<any>) => {
        const yrkeskategoriCopy = [...yrkeskategori];

        const nyKategori = {
            key: d.konseptId,
            value: d.label,
            styrk08: d.styrk08,
        };
        yrkeskategoriCopy.push(nyKategori);
        context.endreSkjemaVerdi('yrkeskategori', yrkeskategoriCopy);
    }); */

    return (
        <div className="yrkeskategorier">
            <Label htmlFor={'yrkeskategori'} id="yrkeskategori-label">
                Hvilke yrkeskategorier tilhører de berørte?
            </Label>
            <Normaltekst id="autocomplete-input-description">For eksempel: kokk</Normaltekst>
            <Autocomplete
                suggestions={suggestions}
                value={value}
                onChange={async (value: any) => {
                    setValue(value);
                    const newSuggestionList = await getUpdatedSuggestions(
                        stillingstitlerPath,
                        value
                    );
                    setSuggestions(newSuggestionList);
                }}
                id="yrkeskategori-input"
                placeholder="Skriv inn og velg fra listen"
                ariaLabel="yrkeskategori-label"
                name="yrkeskategori"
                aria-describedby="autocomplete-input-description"
                onSelect={valgt => {
                    const existing = selected.find((e: any) => e.key === valgt.key);
                    if (!existing) {
                        // const selectedCopy = [...selected];
                        selected.push(valgt);
                        setSelected(selected);
                        // leggTilYrke(valgt);
                        setValue('');
                    }
                }}
            />
            {selected && <Normaltekst>Du har valgt:</Normaltekst>}
            <YrkeskategoriValgt selected={selected} setSelected={setSelected} />
        </div>
    );
};
