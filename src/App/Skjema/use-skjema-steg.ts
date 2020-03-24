import { useContext } from 'react';
import { Feature, FeatureToggleContext } from '../FeatureToggleProvider';

export interface SkjemaSideProps {}

export interface SkjemaSteg {
    aktiv: boolean;
    index: number;
    label: string;
    slug: string;
}

export type UseSkjemaSteg = {
    steg: SkjemaSteg[];
    forrigeSide: string;
    nesteSide: string;
};

export const createSkjemaPath = (slug: string, id?: string) => {
    return ['', 'skjema', slug, id].join('/');
};

export const useSkjemaSteg = (currentPathName: string, id: string): UseSkjemaSteg => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const tillatFnrInput = featureToggleContext[Feature.tillatFnrInput];

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

    const nesteSide = (() => {
        const aktivSteg = steg.find(e => e.aktiv);
        if (aktivSteg && steg[aktivSteg.index + 1]) {
            return createSkjemaPath(steg[aktivSteg.index + 1].slug, id);
        } else {
            return '';
        }
    })();

    const forrigeSide = (() => {
        const aktivSteg = steg.find(e => e.aktiv);
        if (aktivSteg && steg[aktivSteg.index - 1]) {
            return createSkjemaPath(steg[aktivSteg.index - 1].slug, id);
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
