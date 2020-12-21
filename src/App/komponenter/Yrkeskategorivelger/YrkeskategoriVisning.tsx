import React from 'react';
import SlettIkon from './SlettIkon';
import { Yrkeskategori } from '../../../types/permitteringsskjema';

interface YrkeskategoriVisningProps {
    yrkeskategorier: Yrkeskategori[];
    setYrkeskategorier: (yrkeskategorier: Yrkeskategori[]) => void;
}

export const YrkeskategoriVisning = ({
    yrkeskategorier,
    setYrkeskategorier,
}: YrkeskategoriVisningProps) => {
    return (
        <div>
            <ul className="yrker-valgt" aria-label="Valgte yrkeskaegorier">
                {yrkeskategorier.map((kategori: any, index: number) => {
                    return (
                        <li className="yrke" key={kategori.konseptId}>
                            <div>{kategori.label}</div>
                            <button
                                className="slett"
                                aria-label={`${kategori.label} Trykk enter for å slette yrkeskategori `}
                                onClick={() => {
                                    const yrkeskategorierCopy = [...yrkeskategorier];
                                    yrkeskategorierCopy.splice(index, 1);
                                    setYrkeskategorier(yrkeskategorierCopy);
                                }}
                            >
                                <SlettIkon />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default YrkeskategoriVisning;
