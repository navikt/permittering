import React, {FunctionComponent, useEffect, useState} from 'react';
import {Yrkeskategori} from '../../../types/Permitteringsskjema';
import './Yrkeskategorivelger.css';
import {Typeahead} from './typeahead/Typeahead';
import {ErrorMessage} from "@navikt/ds-react";

export interface Sokeforslag {
    key: string;
    value: string;
    styrk08?: string;
}

const getUpdatedSuggestions = async (path: string, q: string) => {
    const result = await fetch(path + '?' + new URLSearchParams({ q }).toString());
    const rawData = await result.json();
    const data: Yrkeskategori[] = rawData.typeaheadYrkeList;
    let suggestions: Sokeforslag[] = [];

    data.forEach((kategori: Yrkeskategori) => {
        suggestions.push({
            key: `${kategori.konseptId}-${kategori.label}`,
            value: kategori.label,
            styrk08: kategori.styrk08[0],
        });
    });
    return suggestions;
};

interface YrkeskategorivelgerProps {
    label: string;
    id: string;
    error?: string;
    yrkeskategorier: Yrkeskategori[];
    leggTilYrkeskategori: (nykategori: Yrkeskategori) => void;
    fjernYrkeskategori: (kategori: Yrkeskategori) => void;
}

const Yrkeskategorivelger: FunctionComponent<YrkeskategorivelgerProps> = ({
    label,
    id,
    error,
    yrkeskategorier,
    leggTilYrkeskategori,
    fjernYrkeskategori,
}) => {
    const [suggestions, setSuggestions] = useState<Sokeforslag[]>([]);
    const [value, setValue] = useState('');
    const valgtSuggestions = yrkeskategorier.map((k) => k.label);

    useEffect(() => {
        const fetchSuggestions = async () => {
            return await getUpdatedSuggestions('/permittering/api/stillingstitler', value);
        };
        fetchSuggestions().then(setSuggestions);
    }, [value]);

    return (
        <div className={`yrkeskategorier ${error ? "error" : ""}`}>
            <Typeahead
                suggestions={suggestions.map((s) => s.value)}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value);
                }}
                inputId={id}
                label={label}
                description="For eksempel: kokk"
                onSelect={(valgtYrke: string) => {
                    const selected = suggestions.find((s) => s.value === valgtYrke);
                    const finnesAllerede = yrkeskategorier.find(
                        (kategori: Yrkeskategori) => kategori.konseptId.toString() === selected?.key
                    );
                    if (!finnesAllerede && selected) {
                        leggTilYrkeskategori({
                            konseptId: parseInt(selected.key),
                            label: selected.value,
                            styrk08: selected.styrk08 ? selected.styrk08 : '',
                        });
                        setValue('');
                    }
                }}
                onRemoveSuggestion={(suggestion: string) => () => {
                    const existing = yrkeskategorier.find((s) => s.label === suggestion);
                    if (existing) {
                        fjernYrkeskategori(existing);
                    }
                }}
                selectedSuggestions={valgtSuggestions}
            />
            { error && <ErrorMessage>{error}</ErrorMessage> }
        </div>
    );
};

export default Yrkeskategorivelger;
