import React, {FunctionComponent, useEffect, useState} from 'react';
import {Yrkeskategori} from '../../../types/Permitteringsskjema';
import './Yrkeskategorivelger.css';
import {ErrorMessage, UNSAFE_Combobox} from "@navikt/ds-react";

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
            return getUpdatedSuggestions('/permittering/api/stillingstitler', value);
        };
        fetchSuggestions().then(setSuggestions);
    }, [value]);

    return (
        <div className={`yrkeskategorier ${error ? "error" : ""}`}>
            <UNSAFE_Combobox
                isMultiSelect
                options={suggestions.map((s) => s.value)}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement> | null) => {
                    setValue(event?.target.value ||'');
                }}
                id={id}
                label={label}
                description="For eksempel: kokk"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    // needed to prevent form submission on enter
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
                onToggleSelected={(option: string,
                                   isSelected: boolean) => {
                    // TODO: simplify this
                    if (isSelected) {
                        const selected = suggestions.find((s) => s.value === option);
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
                    } else {
                        const existing = yrkeskategorier.find((s) => s.label === option);
                        if (existing) {
                            fjernYrkeskategori(existing);
                        }
                    }


                }}
                selectedOptions={valgtSuggestions}
            />
            { error && <ErrorMessage>{error}</ErrorMessage> }
        </div>
    );
};

export default Yrkeskategorivelger;
