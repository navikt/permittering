import React, { FunctionComponent, useState } from 'react';
import { stringify } from 'querystring';
import Autocomplete from '@navikt/nap-autocomplete';
import { Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { stillingstitlerPath } from '../../../paths.json';
import { Yrkeskategori } from '../../../types/permitteringsskjema';
import { Suggestion } from '@navikt/nap-autocomplete/dist/types/Suggestion';
import './Yrkeskategorivelger.less';

export interface Sokeforslag extends Suggestion {
    styrk08?: string;
}

const getUpdatedSuggestions = async (path: string, q: string) => {
    const result = await fetch(path + '?' + stringify({ q }));
    const data: Yrkeskategori[] = await result.json();
    let suggestions: Sokeforslag[] = [];

    data.forEach((kategori: Yrkeskategori) => {
        suggestions.push({
            key: kategori.konseptId.toString(),
            value: kategori.label,
            styrk08: kategori.styrk08,
        });
    });
    return suggestions;
};

interface YrkeskategorivelgerProps {
    yrkeskategorier: Yrkeskategori[];
    leggTilYrkeskategori: (nykategori: Sokeforslag) => void;
}

const Yrkeskategorivelger: FunctionComponent<YrkeskategorivelgerProps> = ({
    yrkeskategorier,
    leggTilYrkeskategori,
}) => {
    const [suggestions, setSuggestions] = useState<any>([]);
    const [value, setValue] = useState('');

    return (
        <div className="yrkeskategorier">
            <Label htmlFor={'yrkeskategori'} id="yrkeskategori-label">
                Hvilke yrkeskategorier tilhører de berørte?
            </Label>
            <Normaltekst
                id="autocomplete-input-description"
                className="autocomplete-input-description"
            >
                For eksempel: kokk
            </Normaltekst>
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
                onSelect={(valgtYrke: Sokeforslag) => {
                    const finnesAllerede = yrkeskategorier.find(
                        (kategori: Yrkeskategori) => kategori.konseptId.toString() === valgtYrke.key
                    );
                    if (!finnesAllerede) {
                        leggTilYrkeskategori(valgtYrke);
                        setValue('');
                    }
                }}
            />
        </div>
    );
};

export default Yrkeskategorivelger;
