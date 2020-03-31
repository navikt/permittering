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
        <div className="yrker-valgt">
            {yrkeskategorier.map((kategori: any, index: number) => {
                return (
                    <div className="yrke" key={kategori.konseptId}>
                        <div>{kategori.label}</div>
                        <button
                            type="button"
                            className="slettKnapp"
                            aria-label="Slett"
                            onClick={() => {
                                const yrkeskategorierCopy = [...yrkeskategorier];
                                yrkeskategorierCopy.splice(index, 1);
                                setYrkeskategorier(yrkeskategorierCopy);
                            }}
                        >
                            <SlettIkon />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default YrkeskategoriVisning;
