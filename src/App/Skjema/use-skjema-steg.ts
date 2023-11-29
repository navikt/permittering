import { SkjemaNavigasjon } from '../../types/SkjemaNavigasjon';
import { useLocation } from 'react-router-dom';

const stegdefinisjon = [
    {
        label: 'Kontaktinformasjon',
        slug: 'kontaktinformasjon',
    },
    {
        label: 'Generelle opplysninger',
        slug: 'generelle-opplysninger',
    },
    {
        label: 'Oppsummering',
        slug: 'oppsummering',
    },
];

export const useSkjemaSteg = (id: string): SkjemaNavigasjon => {
    const { pathname: currentPathName } = useLocation();
    const steg = stegdefinisjon.map((item, index) => ({
        ...item,
        number: index + 1,
        path: `/skjema/${item.slug}/${id}`,
        aktiv: currentPathName.includes(item.slug),
    }));

    const aktivIndex = steg.findIndex((e) => e.aktiv);
    return {
        steg,
        nesteSide: aktivIndex !== undefined ? steg[aktivIndex + 1]?.path ?? '' : '',
        forrigeSide: aktivIndex !== undefined ? steg[aktivIndex - 1]?.path ?? '' : '',
    };
};
