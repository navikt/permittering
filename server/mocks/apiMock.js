import express from 'express';
import organisasjoner from './organisasjoner.json' assert {type: 'json'};
import årsakskoder from './årsakskoder.json' assert {type: 'json'};

let skjemaId = 0;
const userId = "42";
const mockStorage = {};

export const mock = (app) => {
    app.use(express.json());

    app.get('/permittering/redirect-til-login', (req, res) => res.sendStatus(200));
    app.get('/permittering/api/innlogget', (req, res) => res.sendStatus(200));

    app.get('/permittering/api/skjema', (req, res) => {
        res.json(Object.values(mockStorage));
    });
    app.post('/permittering/api/skjema', (req, res) => {
        const id = `${skjemaId += 1}`;
        const org = organisasjoner.find((org) => req.body.bedriftNr === org.OrganizationNumber);
        const data = { ...(req.body), id, bedriftNavn: org.Name, userId };
        res.status(201).json(mockStorage[id] = {
            ...(data),
            id,
            updated: new Date().toJSON(),
        });
    });
    app.get('/permittering/api/skjema/:id', (req, res) => {
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
    app.put('/permittering/api/skjema/:id', (req, res) => {
        let object = mockStorage[req.params.id] = {
            ...(req.body),
            id: req.params.id,
            updated: new Date().toJSON(),
        };
        res.json(object);
    });
    app.post('/permittering/api/skjema/:id/avbryt', (req, res) => {
        delete mockStorage[req.params.id];
        res.send(Object.values(mockStorage));
    });

    app.post('/permittering/api/skjema/:id/send-inn', (req, res) => {
        const data = mockStorage[req.params.id];
        if (
            !data.kontaktNavn ||
            !data.kontaktEpost ||
            !data.kontaktTlf ||
            !data.startDato ||
            !data.fritekst
        ) {
            res.status(400).send();
        } else {
            res.status(201).json(mockStorage[req.params.id] = {
                ...data,
                sendtInnTidspunkt: new Date().toJSON(),
                updated: new Date().toJSON(),
            });
        }
    });

    app.get('/permittering/api/organisasjoner', (req, res) => {
        res.json(organisasjoner);
    });

    app.get('/permittering/api/kodeverk/%C3%A5rsakskoder', (req, res) => {
        res.json(årsakskoder);
    });
};
