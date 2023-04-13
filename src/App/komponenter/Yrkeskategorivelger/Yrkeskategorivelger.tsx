import React, { FunctionComponent, useState } from 'react';
import { stringify } from 'querystring';
/* TODO: bytt med noe ala https://nav-it.slack.com/archives/C6HJFRRMY/p1662389497021649?thread_ts=1662102321.708009&cid=C6HJFRRMY */
import Autocomplete from '@navikt/nap-autocomplete';
import { Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { Yrkeskategori } from '../../../types/permitteringsskjema';
import { Suggestion } from '@navikt/nap-autocomplete/dist/types/Suggestion';
import './Yrkeskategorivelger.css';

export interface Sokeforslag extends Suggestion {
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
                    setSuggestions([]);
                    setValue(value);
                    const newSuggestionList = await getUpdatedSuggestions(
                        '/permittering/api/stillingstitler',
                        value
                    );
                    setSuggestions(newSuggestionList);
                }}
                id="yrkeskategori-input"
                placeholder="Skriv inn og velg fra listen"
                ariaLabel="Hvilke yrkeskategorier tilhører de berørte?"
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
