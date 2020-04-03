import { SkjemaNavigasjon } from '../../types/SkjemaNavigasjon';

export const useRefusjonSteg = (currentPathName: string, id: string): SkjemaNavigasjon => {
    const createPath = (slug: string, id?: string) => {
        return ['', 'refusjon', slug, id].join('/');
    };
    const steg = [
        {
            label: 'Generelt',
            aktiv: false,
            slug: 'generelt',
        },
        {
            label: 'Arbeidsforhold',
            aktiv: false,
            slug: 'arbeidsforhold',
        },
        {
            label: 'Oppsummering',
            aktiv: false,
            slug: 'oppsummering',
        },
    ]
        .filter(() => {
            return true;
        })
        .map((item, index) => ({
            ...item,
            index,
            path: createPath(item.slug, id),
            aktiv: currentPathName.includes(item.slug),
        }));

    const nesteSide = (() => {
        const aktivSteg = steg.find(e => e.aktiv);
        if (aktivSteg && steg[aktivSteg.index + 1]) {
            return steg[aktivSteg.index + 1].path;
        } else {
            return '';
        }
    })();

    const forrigeSide = (() => {
        const aktivSteg = steg.find(e => e.aktiv);
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
