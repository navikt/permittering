import express from 'express';
import { z } from 'zod';

let skjemaId = 3;
const mockStorage = {
    '1': {
        "type": "PERMITTERING_UTEN_LØNN",
        "yrkeskategorier": [
            {
                "konseptId": 21844,
                "label": "Kokk (skip)",
                "styrk08": "5120.01"
            }
        ],
        "bedriftNr": "910825569",
        "bedriftNavn": "STORFOSNA OG FREDRIKSTAD REGNSKAP",
        "kontaktNavn": "Onkel Donald",
        "kontaktEpost": "donald@duck.co",
        "kontaktTlf": "5555555",
        "antallBerørt": "3",
        "årsakskode": "MANGEL_PÅ_ARBEID",
        "årsakstekst": "Mangel på arbeid eller oppdrag",
        "startDato": "2023-12-04T23:00:00.000Z",
        "ukjentSluttDato": true,
        "sendtInnTidspunkt": "2023-12-01T14:04:29.451Z",
        "id": "1"
    },
    '2': {
        "type": "MASSEOPPSIGELSE",
        "yrkeskategorier": [
            {
                "konseptId": 21844,
                "label": "Kokk (skip)",
                "styrk08": "5120.01"
            }
        ],
        "bedriftNr": "910825569",
        "bedriftNavn": "STORFOSNA OG FREDRIKSTAD REGNSKAP",
        "kontaktNavn": "Onkel Donald",
        "kontaktEpost": "donald@duck.co",
        "kontaktTlf": "5555555",
        "antallBerørt": "3",
        "årsakskode": "MANGEL_PÅ_ARBEID",
        "årsakstekst": "Mangel på arbeid eller oppdrag",
        "startDato": "2023-12-04T23:00:00.000Z",
        "sendtInnTidspunkt": "2023-12-03T14:04:29.451Z",
        "id": "1"
    },
    '3': {
        "type": "INNSKRENKNING_I_ARBEIDSTID",
        "yrkeskategorier": [
            {
                "konseptId": 21844,
                "label": "Kokk (skip)",
                "styrk08": "5120.01"
            }
        ],
        "bedriftNr": "910825569",
        "bedriftNavn": "STORFOSNA OG FREDRIKSTAD REGNSKAP",
        "kontaktNavn": "Onkel Donald",
        "kontaktEpost": "donald@duck.co",
        "kontaktTlf": "5555555",
        "antallBerørt": "3",
        "årsakskode": "MANGEL_PÅ_ARBEID",
        "årsakstekst": "Mangel på arbeid eller oppdrag",
        "startDato": "2023-12-04T23:00:00.000Z",
        "sendtInnTidspunkt": "2023-12-04T14:04:29.451Z",
        "id": "3"
    },
};

export const mock = (app) => {
    app.use(express.json());

    app.get('/permittering/redirect-til-login', (req, res) => res.sendStatus(200));
    app.get('/permittering/api/innlogget', (req, res) => res.sendStatus(200));

    app.get('/permittering/api/skjemaV2', (req, res) => {
        res.json(Object.values(mockStorage).sort((a, b) => b.sendtInnTidspunkt.localeCompare(a.sendtInnTidspunkt)));
    });
    app.get('/permittering/api/skjemaV2/:id', (req, res) => {
        const skjema = mockStorage[req.params.id];
        if (skjema) {
            res.json(skjema);
        } else {
            res.status(404).json({
                error: true,
                message: 'Skjemaet finnes ikke.',
            });
        }
    });
    app.post('/permittering/api/skjemaV2', (req, res) => {
        const id = `${skjemaId += 1}`;
        const lagretSkjema = mockStorage[id] = {...(req.body), id};
        res.status(201).json(lagretSkjema);
    });

    app.get('/permittering/api/organisasjoner-v2', (req, res) => {
        res.json(organisasjonstre);
    });
};

// convert organisasjoner array to AltinnTilgangerResponse
const organisasjonstre = [{
    orgNr: '812345674',
    name: 'En Juridisk Ehhet AS',
    organizationForm: 'AS',
    underenheter: [
        {
            orgNr: '119985432',
            name: 'NAV ENGERDAL',
            organizationForm: 'BEDR',
            underenheter: []
        },
        {
            orgNr: '119988432',
            name: 'NAV HAMAR',
            organizationForm: 'BEDR',
            underenheter: []
        }
    ],
}, {
    orgNr: '118345674',
    name: 'BALLSTAD OG HORTEN',
    organizationForm: 'FLI',
    underenheter: [
        {
            orgNr: '182345674',
            name: 'BALLSTAD OG HAMARØY',
            organizationForm: 'AAFY',
            underenheter: []
        }
    ],
}, {
    orgNr: '123988321',
    name: 'BJØRNØYA OG ROVDE REVISJON',
    organizationForm: 'AS',
    underenheter: [
        {
            orgNr: '321988123',
            name: 'ARENDAL OG BØNES REVISJON',
            organizationForm: 'BEDR',
            underenheter: []
        },
        {
            orgNr: '311288223',
            name: 'GRAVDAL OG SOLLIA REVISJON',
            organizationForm: 'BEDR',
            underenheter: []
        }
    ],
}, {
    orgNr: '311388333',
    name: 'TRANØY OG SANDE I VESTFOLD REGNSKAP',
    organizationForm: 'FLI',
    underenheter: [
        {
            orgNr: '411488444',
            name: 'STORFOSNA OG FREDRIKSTAD REGNSKAP',
            organizationForm: 'AAFY',
            underenheter: []
        }
    ],
}, {
    orgNr: '121488424',
    name: 'BIRTAVARRE OG VÆRLANDET FORELDER',
    organizationForm: 'AS',
    underenheter: [
        {
            orgNr: '999999999',
            name: 'SALTRØD OG HØNEBY',
            organizationForm: 'BEDR',
            underenheter: []
        }
    ],

}]

