export interface SkjemaSideProps {}

export interface SkjemaSteg {
    aktiv: boolean;
    index: number;
    label: string;
    slug: string;
}

export const skjemaSteg = (currentPathName: string, tillatFnrInput: boolean): SkjemaSteg[] => {
    return [
        {
            label: 'Kontaktinformasjon',
            aktiv: false,
            slug: 'kontaktinformasjon',
        },
        {
            label: 'Generelle opplysninger',
            aktiv: false,
            slug: 'generelle-opplysninger',
        },
        {
            label: 'Hvem berøres?',
            aktiv: false,
            slug: 'hvem-rammes',
        },
        {
            label: 'Oppsummering',
            aktiv: false,
            slug: 'oppsummering',
        },
    ]
        .filter(item => {
            if (!tillatFnrInput) {
                if (item.slug === 'hvem-rammes') {
                    return false;
                }
            }
            return true;
        })
        .map((item, index) => ({
            ...item,
            index,
            aktiv: currentPathName.includes(item.slug),
        }));
};
export const createSkjemaPath = (slug: string, id?: string) => {
    return ['', 'skjema', slug, id].join('/');
};

export const nesteSide = (steg: SkjemaSteg[], id: string) => {
    const aktivSteg = steg.find(e => e.aktiv);
    if (aktivSteg && steg[aktivSteg.index + 1]) {
        return createSkjemaPath(steg[aktivSteg.index + 1].slug, id);
    } else {
        return false;
    }
};
export const forrigeSide = (steg: SkjemaSteg[], id: string) => {
    const aktivSteg = steg.find(e => e.aktiv);
    if (aktivSteg && steg[aktivSteg.index - 1]) {
        return createSkjemaPath(steg[aktivSteg.index - 1].slug, id);
    } else {
        return false;
    }
};
