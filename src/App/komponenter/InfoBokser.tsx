import React, { FC } from 'react';
import { Alert, Heading } from '@navikt/ds-react';

type InfoboksProps = {
    id: string;
    visFra: Date;
    visTil: Date;
    Component: FC<{ id: string }>;
};

const infobokser: Array<InfoboksProps> = [
    {
        id: 'tilgangstyring-permittering-25-08-2025',
        visFra: new Date('2025-08-12T00:00:00+02:00'),
        visTil: new Date('2025-08-25T00:00:00+02:00'),
        Component: ({ id }) => {
            return (
                <Alert variant="info">
                    <Heading spacing size="small" level="2">
                        Strengere tilgangsstyring fra 25 august - Permittering & Nedbemanning
                    </Heading>
                    For å få tilgang til skjema for permittering, oppsigelse eller innskrenkning i
                    arbeidstid, må du ha enkeltrettigheten "Skjema til NAV om permitteringer,
                    oppsigelser, eller innskrenkning i arbeidstid". Gir tilgang til å opprette og se
                    innsendte meldinger.
                </Alert>
            );
        },
    },
];

export const InfoBokser = () => {
    const infobokserSomSkalVises = infobokser.filter(({ id, visFra, visTil }) =>
        shouldDisplay({
            showFrom: visFra,
            showUntil: visTil,
            currentTime: new Date(),
        })
    );

    return (
        <>
            {infobokserSomSkalVises.map(({ id, Component }) => (
                <Component key={id} id={id} />
            ))}
        </>
    );
};

const shouldDisplay = ({
    showFrom,
    currentTime,
    showUntil,
}: {
    showFrom: Date;
    currentTime: Date;
    showUntil: Date;
}) => showFrom <= currentTime && currentTime < showUntil;

