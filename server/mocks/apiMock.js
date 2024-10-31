import express from 'express';

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
    orgnr: '812345674',
    navn: 'En Juridisk Ehhet AS',
    organisasjonsform: 'AS',
    underenheter: [
        {
            orgnr: '119985432',
            navn: 'NAV ENGERDAL',
            organisasjonsform: 'BEDR',
            underenheter: []
        },
        {
            orgnr: '119988432',
            navn: 'NAV HAMAR',
            organisasjonsform: 'BEDR',
            underenheter: []
        }
    ],
}, {
    orgnr: '118345674',
    navn: 'BALLSTAD OG HORTEN',
    organisasjonsform: 'FLI',
    underenheter: [
        {
            orgnr: '182345674',
            navn: 'BALLSTAD OG HAMARØY',
            organisasjonsform: 'AAFY',
            underenheter: []
        }
    ],
}, {
    orgnr: '123988321',
    navn: 'BJØRNØYA OG ROVDE REVISJON',
    organisasjonsform: 'AS',
    underenheter: [
        {
            orgnr: '321988123',
            navn: 'ARENDAL OG BØNES REVISJON',
            organisasjonsform: 'BEDR',
            underenheter: []
        },
        {
            orgnr: '311288223',
            navn: 'GRAVDAL OG SOLLIA REVISJON',
            organisasjonsform: 'BEDR',
            underenheter: []
        }
    ],
}, {
    orgnr: '311388333',
    navn: 'TRANØY OG SANDE I VESTFOLD REGNSKAP',
    organisasjonsform: 'FLI',
    underenheter: [
        {
            orgnr: '411488444',
            navn: 'STORFOSNA OG FREDRIKSTAD REGNSKAP',
            organisasjonsform: 'AAFY',
            underenheter: []
        }
    ],
}, {
    orgnr: '121488424',
    navn: 'BIRTAVARRE OG VÆRLANDET FORELDER',
    organisasjonsform: 'AS',
    underenheter: [
        {
            orgnr: '999999999',
            navn: 'SALTRØD OG HØNEBY',
            organisasjonsform: 'BEDR',
            underenheter: []
        }
    ],

}]

