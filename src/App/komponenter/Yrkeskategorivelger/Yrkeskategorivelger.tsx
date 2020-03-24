import React, { FunctionComponent } from 'react';
import { stringify } from 'querystring';
import Autocomplete from '@navikt/nap-autocomplete';
import { Label } from 'nav-frontend-skjema';

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
    const [suggestions, setSuggestions] = React.useState<any>([]);
    const [value, setValue] = React.useState('');
    return (
        <>
            <Label htmlFor={'yrkeskategori'}>Hvilke yrkeskategorier tilhører de berørte?</Label>
            <Autocomplete
                suggestions={suggestions}
                value={value}
                onChange={async (v: any) => {
                    setValue(v);
                    const newSuggestionList = await getUpdatedSuggestions(props.searchPath, v);
                    setSuggestions(newSuggestionList);
                }}
                id="test"
                placeholder="Søk etter yrke"
                ariaLabel="test"
                name="yrkeskategori"
                onSelect={d => {
                    const existing = props.selected.find((e: any) => e.key === d.key);
                    if (existing === undefined) {
                        const selectedCopy = [...props.selected];
                        selectedCopy.push(d);
                        props.setSelected(selectedCopy);
                        setValue('');
                    }
                }}
            />
        </>
    );
};
