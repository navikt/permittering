const app = require('express')();
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const apiMock = require('./routes/apiMock');
const settingsJsRoutes = require('./routes/settingsJs');
const stillingstitlerMock = require('./routes/stillingstitlerMock');

const startServer = (app, port) => {
    console.log('start heroku server');
    settingsJsRoutes(app);
    loginRoutes(app);
    apiMock(app);
    internalRoutes(app);
    indexRoute(app);
    stillingstitlerMock(app);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

/**
 * Config for running on Heroku
 *
 * @param app
 * @param port
 */
startServer(app, process.env.PORT || 3000);
