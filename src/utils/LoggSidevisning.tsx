import { FunctionComponent } from 'react';
import { useLoggBesøk } from './analytics';

export const LoggSidevisning: FunctionComponent = () => {
    useLoggBesøk();
    return <></>;
};
