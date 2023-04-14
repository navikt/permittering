import React from 'react';
import { TextField } from '@navikt/ds-react';
import SlettKnapp from './SlettKnapp/SlettKnapp';

const YrkeskategoriTabell: React.FunctionComponent<any> = ({ selected, setSelected }) => {
    return (
        <table className="input-av-personer__tabell tabell">
            <thead>
                <tr>
                    <th role="columnheader" aria-sort="none">
                        Key
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Yrkeskategori
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Antall
                    </th>
                    <th role="columnheader" aria-sort="none">
                        Slett
                    </th>
                </tr>
            </thead>
            <tbody>
                {selected.map((kategori: any, index: number) => {
                    return (
                        <tr key={'row' + kategori.key}>
                            <td>{kategori.key}</td>
                            <td>{kategori.value}</td>
                            <td>
                                <TextField
                                    label=""
                                    hideLabel
                                    size="small"
                                    defaultValue={'0'}
                                    value={kategori.antall || null}
                                    onChange={(e) => {
                                        kategori.antall = e.currentTarget.value;
                                        const selectedCopy = [...selected];
                                        selectedCopy.splice(index, 1, kategori);
                                        setSelected(selectedCopy);
                                    }}
                                />
                            </td>

                            <td>
                                <SlettKnapp
                                    ariaLabel={'slette'}
                                    onClick={() => {
                                        const selectedCopy = [...selected];
                                        selectedCopy.splice(index, 1);
                                        setSelected(selectedCopy);
                                    }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default YrkeskategoriTabell;
