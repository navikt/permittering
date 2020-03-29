import React from 'react';
import 'nav-frontend-tabell-style';
import TrashcanIkon from './Yrkeskategorivelger-gammel/SlettKnapp/TrashcanIkon';

export const YrkeskategoriValgt = ({ selected, setSelected }: any) => {
    return (
        <>
            {selected.map((kategori: any, index: number) => {
                return (
                    <div className="yrker-valgt">
                        <div>{kategori.value}</div>
                        <button
                            type="button"
                            className="slettKnapp"
                            aria-label="Slett"
                            onClick={() => {
                                console.log('sletter', kategori.key);
                                const selectedCopy = [...selected];
                                selectedCopy.splice(index, 1);
                                setSelected(selectedCopy);
                            }}
                        >
                            <TrashcanIkon width={20} height={20} />
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default YrkeskategoriValgt;
