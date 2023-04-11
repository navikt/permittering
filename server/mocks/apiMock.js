import express from 'express';
import cookieParser from 'cookie-parser';
import require from '../esm-require.js';
import * as storageClient from './StorageMock.js';
import organisasjoner from './organisasjoner.json' assert { type: 'json' };
import årsakskoder from './årsakskoder.json' assert { type: 'json' };
const uuid = require('uuid');

export const mock = (app) => {
    app.use(express.json());
    app.use(cookieParser());

    // TODO: is this even used?
    app.use((req, res, next) => {
        if (!req.cookies['localhost-idtoken']) {
            res.cookie('localhost-idtoken', uuid.v1(), { maxAge: 900000, httpOnly: false });
        }
        next();
    });

    app.get('/permittering/redirect-til-login', (req, res) => res.sendStatus(200));
    app.get('/permittering/api/innlogget', (req, res) => res.sendStatus(200));

    /**
     * Gir deg alle skjemaer innlogget bruker har tilgang til
     */
    app.get('/permittering/api/skjema', (req, res) => {
        const userId = req.cookies['localhost-idtoken'];
        const list = storageClient.listObjects();
        const filteredList = list.filter((o) => o.userId === userId);
        const reduced = [];
        filteredList.forEach((e) => {
            delete e.personer;
            reduced.push(e);
        });
        res.json(reduced);
    });
    /**
     * Oppretter nytt skjema
     */
    app.post('/permittering/api/skjema', (req, res) => {
        const userId = req.cookies['localhost-idtoken'];
        const inputData = req.body;
        const id = uuid.v1();
        const org = organisasjoner.find((org) => req.body.bedriftNr === org.OrganizationNumber);
        const bedriftNavn = org.Name;
        const skjema = storageClient.putObject(id, { ...inputData, id, bedriftNavn, userId });
        res.status(201).json(skjema);
    });
    /**
     * Gir deg ett skjema
     */
    app.get('/permittering/api/skjema/:id', (req, res) => {
        const skjema = storageClient.getObject(req.params.id);
        if (skjema) {
            res.json(skjema);
        } else {
            res.status(404).json({
                error: true,
                message: 'Skjemaet finnes ikke.',
            });
        }
    });

    /**
     * Oppdaterer ett skjema
     */
    app.put('/permittering/api/skjema/:id', (req, res) => {
        const skjema = storageClient.putObject(req.params.id, req.body);
        res.json(skjema);
    });

    /**
     * Sletter ett skjema
     */
    app.post('/permittering/api/skjema/:id/avbryt', (req, res) => {
        const skjema = storageClient.deleteObject(req.params.id);
        res.json(skjema);
    });

    app.get('/permittering/api/organisasjoner', (req, res) => {
        res.json(organisasjoner);
    });

    app.get('/permittering/api/kodeverk/årsakskoder'.replace('å', '%C3%A5'), (req, res) => {
        res.json(årsakskoder);
    });

    app.post('/permittering/api/skjema/:id/send-inn', (req, res) => {
        const data = storageClient.getObject(req.params.id);
        if (
            !data.kontaktNavn ||
            !data.kontaktEpost ||
            !data.kontaktTlf ||
            !data.startDato ||
            !data.fritekst
        ) {
            res.status(400).send();
            return;
        }
        const sendtInnTidspunkt = new Date().toJSON();
        const skjema = storageClient.putObject(req.params.id, { ...data, sendtInnTidspunkt });
        res.status(201).json(skjema);
    });
};
