const paths = require('../../paths');
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const storageClient = require('../StorageMock');
const organisasjoner = require('../../fixtures/organisasjoner.json');
const cookieName = 'localhost-idtoken';
/**
 * Mock for å
 */
module.exports = function(app) {
    app.use(express.json());
    app.use(cookieParser());

    app.use((req, res, next) => {
        if (!req.cookies[cookieName]) {
            res.cookie(cookieName, uuid.v1(), { maxAge: 900000, httpOnly: false });
        }
        next();
    });

    /**
     * Gir deg alle skjemaer innlogget bruker har tilgang til
     */
    app.get(paths.skjemaListPath, (req, res) => {
        const userId = req.cookies[cookieName];
        const list = storageClient.listObjects();
        const filteredList = list.filter(o => o.userId === userId);
        const reduced = [];
        filteredList.forEach(e => {
            delete e.personer;
            reduced.push(e);
        });
        res.json(reduced);
    });
    /**
     * Oppretter nytt skjema
     */
    app.post(paths.skjemaListPath, (req, res) => {
        const userId = req.cookies[cookieName];
        const inputData = req.body;
        const id = uuid.v1();
        const org = organisasjoner.find(org => req.body.bedriftNr === org.OrganizationNumber);
        const bedriftNavn = org.Name;
        const skjema = storageClient.putObject(id, { ...inputData, id, bedriftNavn, userId });
        res.status(201).json(skjema);
    });
    /**
     * Gir deg ett skjema
     */
    app.get(paths.skjemaPath, (req, res) => {
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
    app.put(paths.skjemaPath, (req, res) => {
        const skjema = storageClient.putObject(req.params.id, req.body);
        res.json(skjema);
    });

    /**
     * Sletter ett skjema
     */
    app.delete(paths.skjemaPath, (req, res) => {
        const skjema = storageClient.deleteObject(req.params.id);
        res.json(skjema);
    });

    app.get(paths.hentOrganisasjonerLink, (req, res) => {
        console.log('Fetching organisasjoner');
        res.json(organisasjoner);
    });

    app.get(paths.featurePath, (req, res) => {
        const features = alleFeatures.reduce((obj, item) => ({ ...obj, [item]: true }), {});
        res.json(features);
    });

    app.post(paths.skjemaSendInnPath, (req, res) => {
        const inputData = req.body;
        const sendtInnTidspunkt = new Date().toJSON();
        const skjema = storageClient.putObject(req.params.id, { ...inputData, sendtInnTidspunkt });
        res.status(201).json(skjema);
    });
};
