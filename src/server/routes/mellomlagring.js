const paths = require('../paths');
const express = require('express');

module.exports = function(app, storageClient) {
  app.use(express.json());
  /**
   * Gir deg alle skjemaer på ett orgnummer
   */
  app.get(`${paths.base_path}/api/skjema/:brukerId`, (req, res) => {
    const list = storageClient.listObjects(req.params.brukerId);
    res.json(list);
  });

  /**
   * Gir deg ett skjema
   */
  app.get(`${paths.base_path}/api/skjema/:brukerId/:skjemaId`, (req, res) => {
    const skjema = storageClient.getObject(req.params.brukerId, req.params.skjemaId);
    res.json(skjema);
  });

  /**
   * Gir oppdaterer ett skjema eller lager ett nytt ett hvis det ikke eksisterer
   */
  app.post(`${paths.base_path}/api/skjema/:brukerId/:skjemaId`, (req, res) => {
    const skjema = storageClient.putObject(req.params.brukerId, req.params.skjemaId, req.body);
    res.json(skjema);
  });

  /**
   * Sletter ett skjema
   */
  app.delete(`${paths.base_path}/api/skjema/:brukerId/:skjemaId`, (req, res) => {
    const skjema = storageClient.deleteObject(req.params.brukerId, req.params.skjemaId);
    res.json(skjema);
  });
};
