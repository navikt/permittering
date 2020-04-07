const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const getDecorator = require('./routes/decorator');
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const apiMock = require('./routes/apiMock');
const stillingstitlerMock = require('./routes/stillingstitlerMock');
const settingsJsRoutes = require('./routes/settingsJs');
const veilarbstepupRoutes = require('./routes/veilarbstepup');
const port = process.env.PORT || 3000;
const path = require('path');
const buildPath = path.join(__dirname, '../../build');
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
        app.render('index.html', decoratorFragments, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = html => {
    console.log('start heroku server');
    settingsJsRoutes(app);
    veilarbstepupRoutes(app);
    loginRoutes(app);
    apiMock(app);
    internalRoutes(app);
    indexRoute(app, html);
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

getDecorator()
    .then(renderApp, error => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, error => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
