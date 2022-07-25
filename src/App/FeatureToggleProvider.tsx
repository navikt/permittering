import React, { createContext, useEffect, useState } from 'react';
// @ts-ignore
import * as paths from '../paths';

export enum Feature {}

const featureTogglePath = (features: Feature[]): string => {
    const query = features.map((feature) => `feature=${feature}`).join('&');
    return `${paths.featurePath}?${query}`;
};

export const alleFeatures: Feature[] = []; // Object.values(Feature);

export interface FeatureToggles {
    [toggles: string]: boolean;
}

export const FeatureToggleContext = createContext<FeatureToggles>({});

const hentFeatureToggles = async (featureToggles: Feature[]): Promise<FeatureToggles> => {
    if (featureToggles.length === 0) {
        return {};
    }
    const response = await fetch(featureTogglePath(featureToggles), { credentials: 'same-origin' });
    return await response.json();
};

export const FeatureToggleProvider = (props: any) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({});

    const hentToggles = () => {
        hentFeatureToggles(alleFeatures).then(setFeatureToggles);
    };

    useEffect(() => {
        hentToggles();
    }, []);

    return (
        <FeatureToggleContext.Provider value={featureToggles}>
            {props.children}
        </FeatureToggleContext.Provider>
    );
};
