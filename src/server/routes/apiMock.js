const paths = require("../../paths");
const express = require("express");
const uuid = require("uuid");
const storageClient = require("../StorageMock");
/**
 * Mock for å
 */
module.exports = function(app) {
  app.use(express.json());
  /**
   * Gir deg alle skjemaer innlogget bruker har tilgang til
   */
  app.get(paths.skjemaListPath, (req, res) => {
    const list = storageClient.listObjects();
    res.json(list);
  });
  /**
   * Oppretter nytt skjema
   */
  app.post(paths.skjemaListPath, (req, res) => {
    const id = uuid.v1();
    const skjema = storageClient.putObject(id, {
      id
    });
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
        message: "Skjemaet finnes ikke."
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
};
