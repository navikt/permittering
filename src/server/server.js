const path = require('path');
const express = require('express');
const BASE_PATH = '/permittering';
const server = express();
const mustacheExpress = require('mustache-express');
const Promise = require('promise');

const buildPath = path.join(__dirname, '../../build');
const port = process.env.PORT || 3000;

server.use(`${BASE_PATH}/veilarbstepup/status`, veilarbStatusProxyConfig);

server.engine('html', mustacheExpress());
server.set('view engine', 'mustache');
server.set('views', buildPath);

const startMockServer = html => {
    console.log('start server');
    server.use(BASE_PATH, express.static(buildPath));

    setInternalEndpoints();

    server.get(`${BASE_PATH}/*`, (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
    server.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

const setInternalEndpoints = () => {
    server.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));
};


server.engine('html', mustacheExpress());
server.set('view engine', 'mustache');
server.set('views', buildPath);

server.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
  const loginUrl =
      process.env.LOGIN_URL ||
      'http://localhost:8080/permittering-api/local/selvbetjening-login?redirect=http://localhost:3000/permittering';
  res.redirect(loginUrl);
});

const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
      server.render('index.html', decoratorFragments, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });

const startServer = html => {
  console.log('start server');
  server.use(BASE_PATH, express.static(buildPath, { index: false }));

  setInternalEndpoints();
  server.get(`${BASE_PATH}/*`, (req, res) => {
    res.send(html);
  });
  server.listen(port, () => {
    console.log('Server listening on port', port);
  });
};

if (process.env.REACT_APP_MOCK) {
  startMockServer();
} else {
  renderApp("").then(startServer, error => {
    console.error('Kunne ikke rendre app ', error);
    process.exit(1);
  });
}
