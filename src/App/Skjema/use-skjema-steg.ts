import { SkjemaNavigasjon } from '../../types/SkjemaNavigasjon';

const createSkjemaPath = (slug: string, id?: string) => {
    return ['', 'skjema', slug, id].join('/');
};

export const useSkjemaSteg = (currentPathName: string, id: string): SkjemaNavigasjon => {
    const steg = [
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
            label: 'Oppsummering',
            aktiv: false,
            slug: 'oppsummering',
        },
    ].map((item, index) => ({
        ...item,
        index,
        path: createSkjemaPath(item.slug, id),
        aktiv: currentPathName.includes(item.slug),
    }));

    const nesteSide = (() => {
        const aktivSteg = steg.find((e) => e.aktiv);
        if (aktivSteg && steg[aktivSteg.index + 1]) {
            return steg[aktivSteg.index + 1].path;
        } else {
            return '';
        }
    })();

    const forrigeSide = (() => {
        const aktivSteg = steg.find((e) => e.aktiv);
        if (aktivSteg && steg[aktivSteg.index - 1]) {
            return steg[aktivSteg.index - 1].path;
        } else {
            return '';
        }
    })();
    return {
        steg,
        nesteSide,
        forrigeSide,
    };
};
