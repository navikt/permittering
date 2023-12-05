import express from 'express';
import organisasjoner from './organisasjoner.json' assert {type: 'json'};

let skjemaId = 0;
const mockStorage = {};

export const mock = (app) => {
    app.use(express.json());

    app.get('/permittering/redirect-til-login', (req, res) => res.sendStatus(200));
    app.get('/permittering/api/innlogget', (req, res) => res.sendStatus(200));

    app.get('/permittering/api/skjema', (req, res) => {
        res.json(Object.values(mockStorage));
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
    app.post('/permittering/api/skjemaV2', (req, res) => {
        const id = `${skjemaId += 1}`;
        const lagretSkjema = mockStorage[id] = {...(req.body), id};
        res.status(201).json(lagretSkjema);
    });

    app.get('/permittering/api/organisasjoner', (req, res) => {
        res.json(organisasjoner);
    });
};
