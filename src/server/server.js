const app = require('express')();
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const apiProxy = require('./routes/apiProxy');

const BASE_PATH = '/permittering';
const veilarbStatusProxyConfig = require('./veilarbStatusProxyConfig');

const server = express();

app.use(`${BASE_PATH}/veilarbstepup/status`, veilarbStatusProxyConfig);

const startServer = (app, port) => {
    console.log('start server');
    loginRoutes(app);
    apiProxy(app);
    internalRoutes(app);
    indexRoute(app);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

const startMockServer = html => {
    console.log('start server');
    app.use(BASE_PATH, express.static(buildPath));
    setInternalEndpoints();
    server.get(`${BASE_PATH}/*`, (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
    server.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

server.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {
  const loginUrl =
      process.env.LOGIN_URL ||
      'http://localhost:8080/permittering-api/local/selvbetjening-login?redirect=http://localhost:3000/permittering';
  res.redirect(loginUrl);
});


if (process.env.REACT_APP_MOCK) {
  startMockServer();
} else {
    startServer(app, process.env.PORT || 3000);
};