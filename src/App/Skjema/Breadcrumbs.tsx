import {FunctionComponent, useEffect} from "react";
import {setBreadcrumbs} from "@navikt/nav-dekoratoren-moduler";
import {gittMiljo} from "../../utils/environment";


const urlTilMinSideArbeidsgiver = gittMiljo({
    prod: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/',
    dev: 'https://arbeidsgiver.intern.dev.nav.no/min-side-arbeidsgiver/',
    demo: 'https://arbeidsgiver.ekstern.dev.nav.no/min-side-arbeidsgiver/',
    other: 'https://arbeidsgiver.nav.no/min-side-arbeidsgiver/',
});

const defaultBreadcrumbs = [
    { url: urlTilMinSideArbeidsgiver, title: 'Min side – arbeidsgiver' },
    { url: '/', title: 'Permittering og oppsigelse' },
]

export type Breadcrumb = {
    url: string;
    title: string;
    handleInApp?: boolean;
};

export const Breadcrumbs: FunctionComponent<{ breadcrumb?: Breadcrumb}> = ({ breadcrumb }) => {
    useEffect(() => {
        setBreadcrumbs([
            ...defaultBreadcrumbs,
            ...(breadcrumb ? [breadcrumb] : []),
        ]);
    }, []);

    return <></>;
}