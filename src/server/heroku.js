const app = require('express')();
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const apiMock = require('./routes/apiMock');
const settingsJsRoutes = require('./routes/settingsJs');

const startServer = (app, port) => {
    console.log('start server');
    settingsJsRoutes(app);
    loginRoutes(app);
    apiMock(app);
    internalRoutes(app);
    indexRoute(app);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

startServer(app, process.env.PORT || 3000);
