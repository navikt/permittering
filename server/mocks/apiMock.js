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

    app.get('/permittering/api/organisasjoner', (req, res) => {
        res.json(organisasjoner);
    });
};

const organisasjoner = [
    {
        Name: 'En Juridisk Ehhet AS',
        Type: 'Enterprise',
        ParentOrganizationNumber: null,
        OrganizationNumber: '812345674',
        OrganizationForm: 'AS',
        Status: 'Active',
    },
    {
        Name: 'BALLSTAD OG HAMARØY',
        Type: 'Business',
        OrganizationNumber: '182345674',
        ParentOrganizationNumber: '118345674',
        OrganizationForm: 'AAFY',
        Status: 'Active',
    },
    {
        Name: 'BALLSTAD OG HORTEN',
        Type: 'Enterprise',
        ParentOrganizationNumber: null,
        OrganizationNumber: '118345674',
        OrganizationForm: 'FLI',
        Status: 'Active',
    },
    {
        Name: 'TEST AV AAFY ',
        Type: 'Business',
        OrganizationNumber: '119845674',
        ParentOrganizationNumber: '118985674',
        OrganizationForm: 'AAFY',
        Status: 'Active',
    },
    {
        Name: 'NAV ENGERDAL',
        Type: 'Business',
        ParentOrganizationNumber: '812345674',
        OrganizationNumber: '119985432',
        OrganizationForm: 'BEDR',
        Status: 'Active',
    },
    {
        Name: 'NAV HAMAR',
        Type: 'Business',
        ParentOrganizationNumber: '812345674',
        OrganizationNumber: '119988432',
        OrganizationForm: 'BEDR',
        Status: 'Active',
    },
    {
        Name: 'BJØRNØYA OG ROVDE REVISJON',
        Type: 'Enterprise',
        ParentOrganizationNumber: null,
        OrganizationNumber: '123988321',
        OrganizationForm: 'AS',
        Status: 'Active',
    },
    {
        Name: 'ARENDAL OG BØNES REVISJON',
        Type: 'Business',
        ParentOrganizationNumber: '123988321',
        OrganizationNumber: '321988123',
        OrganizationForm: 'BEDR',
        Status: 'Active',
    },
    {
        Name: 'GRAVDAL OG SOLLIA REVISJON',
        Type: 'Business',
        ParentOrganizationNumber: '123988321',
        OrganizationNumber: '311288223',
        OrganizationForm: 'BEDR',
        Status: 'Active',
    },
    {
        Name: 'STORFOSNA OG FREDRIKSTAD REGNSKAP',
        Type: 'Business',
        ParentOrganizationNumber: '311388333',
        OrganizationNumber: '411488444',
        OrganizationForm: 'AAFY',
        Status: 'Active',
    },
    {
        Name: 'TRANØY OG SANDE I VESTFOLD REGNSKAP',
        Type: 'Enterprise',
        ParentOrganizationNumber: null,
        OrganizationNumber: '311388333',
        OrganizationForm: 'FLI',
        Status: 'Active',
    },
    {
        Name: 'BIRTAVARRE OG VÆRLANDET FORELDER',
        Type: 'Enterprise',
        OrganizationNumber: '121488424',
        OrganizationForm: 'AS',
        Status: 'Active',
    },
    {
        Name: 'SALTRØD OG HØNEBY',
        Type: 'Business',
        OrganizationNumber: '999999999',
        ParentOrganizationNumber: '121488424',
        OrganizationForm: 'BEDR',
        Status: 'Active',
    },
];