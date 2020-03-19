const express = require('express');
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const apiProxy = require('./routes/apiProxy');
const settingsJsRoutes = require('./routes/settingsJs');
const veilarbstepupRoutes = require('./routes/veilarbstepup');

const startServer = port => {
    const app = express();
    console.log('start regular server');
    settingsJsRoutes(app);
    veilarbstepupRoutes(app);
    loginRoutes(app);
    apiProxy(app);
    internalRoutes(app);
    indexRoute(app);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

const startMockServer = port => {
    console.log('start mock server');
    const app = express();
    settingsJsRoutes(app);
    veilarbstepupRoutes(app);
    loginRoutes(app);
    apiProxy(app);
    internalRoutes(app);
    indexRoute(app);
    app.listen(port, () => {
        console.log('Mock server listening on port', port);
    });
};

if (process.env.REACT_APP_MOCK) {
    startMockServer(process.env.PORT || 3000);
} else {
    startServer(process.env.PORT || 3000);
}
