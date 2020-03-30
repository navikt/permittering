import React from 'react';
import TrashcanIkon from './Yrkeskategorivelger-gammel/SlettKnapp/TrashcanIkon';

export const YrkeskategoriValgt = ({ selected, setSelected, fjernYrkeskategori }: any) => {
    return (
        <>
            {selected.map((kategori: any, index: number) => {
                return (
                    <div className="yrker-valgt" key={kategori.key}>
                        <div>{kategori.value}</div>
                        <button
                            type="button"
                            className="slettKnapp"
                            aria-label="Slett"
                            onClick={() => {
                                console.log('sletter', kategori.key);
                                const selectedCopy = [...selected];
                                console.log('selectedCopy', selectedCopy);
                                selectedCopy.splice(index, 1);
                                setSelected(selectedCopy);
                                fjernYrkeskategori(kategori.key);
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
