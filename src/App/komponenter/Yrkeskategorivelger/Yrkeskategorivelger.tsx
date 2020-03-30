import React, { useContext, useState } from 'react';
import { stringify } from 'querystring';
import Autocomplete from '@navikt/nap-autocomplete';
import { Label } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import YrkeskategoriValgt from './YrkeskategoriValgteYrker';
import { stillingstitlerPath } from '../../../paths.json';
import './Yrkeskategorivelger.less';
import SkjemaContext from '../../SkjemaContext/SkjemaContext';
import { Yrkeskategori } from '../../../types/permitteringsskjema';

interface Sokeforslag {
    key: any;
    value: any;
    styrk08?: any;
}

const getUpdatedSuggestions = async (path: string, q: string) => {
    const result = await fetch(path + '?' + stringify({ q }));
    const data = await result.json();
    const suggestions: Sokeforslag[] = [];

    data.forEach((kategori: Yrkeskategori) => {
        suggestions.push({
            key: kategori.konseptId,
            value: kategori.label,
            styrk08: kategori.styrk08,
        });
    });
    return suggestions;
};

const Yrkeskategorivelger = () => {
    const context = useContext(SkjemaContext);
    const [suggestions, setSuggestions] = useState<any>([]);
    const [value, setValue] = useState('');
    const [selected, setSelected] = React.useState<any[]>([]);
    let { yrkeskategorier = [] } = context.skjema;

    const leggTilYrke = (nyYrkeskategori: Sokeforslag) => {
        const yrkeskategorierCopy = [...yrkeskategorier];
        console.log('yrkeskategorierCopy', yrkeskategorierCopy);
        console.log('nyYrkeskategori', nyYrkeskategori);

        const nyKategori = {
            konseptId: nyYrkeskategori.key,
            label: nyYrkeskategori.value,
            styrk08: nyYrkeskategori.styrk08,
        };
        console.log('nyKategori', nyKategori);
        yrkeskategorierCopy.push(nyKategori);
        console.log('yrkeskategorierCopyppdt', yrkeskategorierCopy);
        context.endreSkjemaVerdi('yrkeskategorier', yrkeskategorierCopy);
    };

    const fjernYrkeskategori = (nyYrkeskategori: Sokeforslag) => {
        const yrkeskategorierCopy = [...yrkeskategorier];
        let foundIndex = yrkeskategorierCopy.findIndex(e => e.konseptId === nyYrkeskategori.key);
        yrkeskategorierCopy.splice(foundIndex, 1);
        context.endreSkjemaVerdi('yrkeskategorier', yrkeskategorierCopy);
    };

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
                    console.log('valgt', valgt);
                    const finnesAllerede = selected.find((e: Sokeforslag) => e.key === valgt.key);
                    if (!finnesAllerede) {
                        console.log('selected:', selected);
                        leggTilYrke(valgt);
                        setSelected([...selected, valgt]);
                        setValue('');
                    }
                }}
            />
            {selected.length ? <Normaltekst>Du har valgt:</Normaltekst> : null}
            <YrkeskategoriValgt
                selected={selected}
                setSelected={setSelected}
                fjernYrkeskategori={fjernYrkeskategori}
            />
        </div>
    );
};

export default Yrkeskategorivelger;
