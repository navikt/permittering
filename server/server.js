import express from 'express';
const app = express();
import { createLogger, format, transports } from 'winston';
import Prometheus from 'prom-client';
import path from 'path';
import { tokenXMiddleware } from './tokenx-middleware.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const {
    PORT = 3000,
    MILJO = 'local',
    GIT_COMMIT = '?',
    LOGIN_URL,
    LOGINSERVICE_LOGOUT_URL = 'https://loginservice.dev.nav.no/slo',
    BACKEND_BASEURL = 'http://localhost:8080',
} = process.env;

const BUILD_PATH = path.join(process.cwd(), '../build');

const log_events_counter = new Prometheus.Counter({
    name: 'logback_events_total',
    help: 'Antall log events fordelt på level',
    labelNames: ['level'],
});
// proxy calls to log.<level> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
const log = new Proxy(
    createLogger({
        transports: [
            new transports.Console({
                timestamp: true,
                format: format.json(),
            }),
        ],
    }),
    {
        get: (_log, level) => {
            return (...args) => {
                log_events_counter.inc({ level: `${level}` });
                return _log[level](...args);
            };
        },
    }
);

let pamJanzzUrl = 'https://arbeidsplassen.nav.no';
if (MILJO === 'dev' || MILJO === 'prod') {
    pamJanzzUrl = 'http://pam-janzz.teampam';
}
const main = async () => {
    console.log(`Starting server on cluster ${process.env.NAIS_CLUSTER_NAME}`);

    app.use(
        '/permittering/api/stillingstitler',
        createProxyMiddleware({
            logLevel: 'info',
            logProvider: (_) => log,
            onError: (err, req, res) => {
                log.error(
                    `${req.method} ${req.path} => [${res.statusCode}:${res.statusText}]: ${err.message}`
                );
            },
            changeOrigin: true,
            secure: true,
            xfwd: true,
            pathRewrite: {
                '^/permittering/api/stillingstitler':
                    '/pam-janzz/rest/typeahead/yrke-med-styrk08-nav',
            },
            target: pamJanzzUrl,
        })
    );

    if (MILJO === 'local' || MILJO === 'demo') {
        (await import('./mocks/apiMock.js')).mock(app);
    } else {
        app.use(
            '/permittering/api',
            tokenXMiddleware({
                log: log,
                audience: {
                    dev: 'dev-gcp:permittering-og-nedbemanning:permitteringsskjema-api',
                    prod: 'prod-gcp:permittering-og-nedbemanning:permitteringsskjema-api',
                }[MILJO],
            }),
            createProxyMiddleware({
                logLevel: 'info',
                logProvider: (_) => log,
                onError: (err, req, res) => {
                    log.error(
                        `${req.method} ${req.path} => [${res.statusCode}:${res.statusText}]: ${err.message}`
                    );
                },
                changeOrigin: true,
                secure: true,
                xfwd: true,
                pathRewrite: {
                    '^/permittering/api': '/permitteringsskjema-api',
                },
                target: BACKEND_BASEURL,
            })
        );

        app.get('/permittering/login-callback', function (req, res) {
            res.redirect(LOGIN_URL);
        });

        app.get('/permittering/logout-callback', function (req, res) {
            res.redirect(LOGINSERVICE_LOGOUT_URL);
        });
    }

    app.get('/permittering/static/js/settings.js', (req, res) => {
        res.contentType('text/javascript');
        res.send(`
            window.environment = {
                MILJO: '${MILJO}',
                GIT_COMMIT: '${GIT_COMMIT}',
            };
        `);
    });
    app.get('/permittering/internal/isAlive', (req, res) => res.sendStatus(200));
    app.get('/permittering/internal/isReady', (req, res) => res.sendStatus(200));
    app.use('/permittering', express.static(BUILD_PATH, { index: false }));
    app.get('/permittering/*', (req, res) => {
        res.sendFile(BUILD_PATH + '/index.html');
    });
    app.get('/', (req, res) => {
        res.redirect(301, '/permittering');
    });

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

main()
    .then((_) => log.info('main started'))
    .catch((e) => log.error('main failed', e));
