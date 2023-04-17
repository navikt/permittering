import React, { FunctionComponent, useEffect, useState } from 'react';
import { stringify } from 'querystring';
import { Yrkeskategori } from '../../../types/permitteringsskjema';
import './Yrkeskategorivelger.css';
import { Typeahead } from './typeahead/Typeahead';

export interface Sokeforslag {
    key: string;
    value: string;
    styrk08?: string;
}

const getUpdatedSuggestions = async (path: string, q: string) => {
    const result = await fetch(path + '?' + stringify({ q }));
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
    yrkeskategorier: Yrkeskategori[];
    leggTilYrkeskategori: (nykategori: Yrkeskategori) => void;
    fjernYrkeskategori: (kategori: Yrkeskategori) => void;
}

const Yrkeskategorivelger: FunctionComponent<YrkeskategorivelgerProps> = ({
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
        <div className="yrkeskategorier">
            <Typeahead
                suggestions={suggestions.map((s) => s.value)}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value);
                }}
                label="Hvilke yrkeskategorier tilhører de berørte?"
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
        </div>
    );
};

export default Yrkeskategorivelger;
