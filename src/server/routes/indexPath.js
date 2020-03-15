const paths = require('../paths');
const path = require('path');
const express = require('express');
const buildPath = path.join(__dirname, '../../../build');
module.exports = app => {
  app.use(paths.base_path, express.static(buildPath));
  app.get(`${paths.base_path}/*`, (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
};
