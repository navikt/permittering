const paths = require("../../paths");
const express = require("express");
const storageClient = require("../StorageMock");
/**
 * Mock for å
 */
module.exports = function(app) {
  app.use(express.json());
  /**
   * Gir deg alle skjemaer på ett orgnummer
   */
  app.get(paths.skjemaListPath, (req, res) => {
    const list = storageClient.listObjects(req.params.orgnummer);
    res.json(list);
  });
  app.post(paths.skjemaListPath, (req, res) => {
    const skjema = storageClient.putObject(req.params.orgnummer, "123", {
      id: "123",
      orgNr: req.params.orgnummer
    });
    res.json(skjema);
  });
  /**
   * Gir deg ett skjema
   */
  app.get(paths.skjemaPath, (req, res) => {
    const skjema = storageClient.getObject(
      req.params.orgnummer,
      req.params.skjemaId
    );
    if (skjema) {
      res.json(skjema);
    } else {
      res.send(
        {
          error: true,
          message: "Skjemaet finnes ikke."
        },
        404
      );
    }
  });

  /**
   * Gir oppdaterer ett skjema eller lager ett nytt ett hvis det ikke eksisterer
   */
  app.put(paths.skjemaPath, (req, res) => {
    const skjema = storageClient.putObject(
      req.params.orgnummer,
      req.params.skjemaId,
      req.body
    );
    res.json(skjema);
  });

  /**
   * Sletter ett skjema
   */
  app.delete(paths.skjemaPath, (req, res) => {
    const skjema = storageClient.deleteObject(
      req.params.orgnummer,
      req.params.skjemaId
    );
    res.json(skjema);
  });
};
