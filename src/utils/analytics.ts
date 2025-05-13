import { AnalyticsEvent, getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler';
import { useLocation } from 'react-router-dom';
import { Hovedenhet, useUnderenhet } from '../api/enhetsRegisteretApi';
import { useEffect } from 'react';
import { gittMiljo } from './environment';
import { CustomEvents } from '../types/AnalyticCustomEvents';

const mockGetAnalyticsInstance = (origin: string) => {
    return (eventName: string, eventData?: any) => {
        console.log(`Analytics Event Logged (Origin: ${origin}):`, eventName, eventData);
        return Promise.resolve(null);
    };
};

export const logger = gittMiljo({
    prod: () => getAnalyticsInstance<CustomEvents>('permittering'),
    dev: () => getAnalyticsInstance<CustomEvents>('permittering'),
    other: () => mockGetAnalyticsInstance('permittering'),
})();

const baseUrl = 'https://arbeidsgiver.nav.no/permittering';

export const useLoggBesøk = () => {
    const { pathname } = useLocation();

    logger('besøk', { url: baseUrl + pathname });
};

const finnSektorNavn = (eregOrg: Hovedenhet) =>
    eregOrg.naeringskode1?.kode?.startsWith('84') ? 'offentlig' : 'privat';

export const useLoggBedriftValgt = (orgnr: string | undefined) => {
    const { underenhet, isLoading } = useUnderenhet(orgnr);

    useEffect(() => {
        if (orgnr === undefined || isLoading) return;

        const virksomhetsinfo: any = {
            url: baseUrl,
        };

        if (underenhet !== undefined) {
            virksomhetsinfo.sektor = finnSektorNavn(underenhet);
            virksomhetsinfo.antallAnsatte = underenhet.antallAnsatte;
        }

        logger('virksomhet valgt', virksomhetsinfo);
    }, [orgnr, underenhet, isLoading]);
};