import express from 'express';
import httpProxyMiddleware, {
    debugProxyErrorsPlugin,
    errorResponsePlugin,
    proxyEventsPlugin,
} from 'http-proxy-middleware';
import { createHttpTerminator } from 'http-terminator';
import Prometheus from 'prom-client';
import { createLogger, format, transports } from 'winston';
import { tokenXMiddleware } from './tokenx.js';
import path from 'path';
import require from './esm-require.js';
import { rateLimit } from 'express-rate-limit';
import crypto from 'crypto';

const apiMetricsMiddleware = require('prometheus-api-metrics');
const { createProxyMiddleware } = httpProxyMiddleware;

const {
    PORT = 3000,
    NAIS_APP_IMAGE = '?',
    GIT_COMMIT = '?',
    LOGIN_URL = '',
    NAIS_CLUSTER_NAME = 'local',
    MILJO = 'local',
    BACKEND_BASEURL = 'http://localhost:8080',
} = process.env;

const log_events_counter = new Prometheus.Counter({
    name: 'logback_events_total',
    help: 'Antall log events fordelt på level',
    labelNames: ['level'],
});
const proxy_events_counter = new Prometheus.Counter({
    name: 'proxy_events_total',
    help: 'Antall proxy events',
    labelNames: ['target', 'proxystatus', 'status', 'errcode'],
});

const maskFormat = format((info) => ({
    ...info,
    message: info.message.replace(/\d{9,}/g, (match) => '*'.repeat(match.length)),
}));


// proxy calls to log.<level> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
const log = new Proxy(
    createLogger({
        format: maskFormat(),
        transports: [
            new transports.Console({
                timestamp: true,
                format: format.combine(format.splat(), format.json()),
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

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('base64');

const apiRateLimit = rateLimit({
    windowMs: 1000, // 1 sekund
    limit: 100, // Limit each IP to 100 requests per `window`
    message: 'You have exceeded the 100 requests in 1s limit!',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        const authHeader = req.headers?.authorization || '';
        if (!authHeader.startsWith('Bearer ')) {
            return req.ip;
        }
        const token = authHeader.substring(7);
        return hashToken(token);
    },
    handler: (req, res, next, options) => {
        if (req.rateLimit.remaining === 0) {
            log.error(`Rate limit reached for client ${req.ip}`);
        }
        res.status(options.statusCode).send(options.message);
    },
});

const cookieScraperPlugin = (proxyServer, options) => {
    proxyServer.on('proxyReq', (proxyReq, req, res, options) => {
        if (proxyReq.getHeader('cookie')) {
            proxyReq.removeHeader('cookie');
        }
    });
};
// copy with mods from http-proxy-middleware https://github.com/chimurai/http-proxy-middleware/blob/master/src/plugins/default/logger-plugin.ts
const loggerPlugin = (proxyServer, options) => {
    proxyServer.on('error', (err, req, res, target) => {
        const hostname = req?.headers?.host;
        // target is undefined when websocket errors
        const errReference = 'https://nodejs.org/api/errors.html#errors_common_system_errors'; // link to Node Common Systems Errors page
        proxy_events_counter.inc({
            target: target.host,
            proxystatus: null,
            status: res.statusCode,
            errcode: err.code || 'unknown',
        });
        const level =
            /HPE_INVALID/.test(err.code) ||
            ['ECONNRESET', 'ENOTFOUND', 'ECONNREFUSED', 'ETIMEDOUT'].includes(err.code)
                ? 'warn'
                : 'error';
        log.log(
            level,
            '[HPM] Error occurred while proxying request %s to %s [%s] (%s)',
            `${hostname}${req?.host}${req?.path}`,
            `${target?.href}`,
            err.code || err,
            errReference
        );
    });

    proxyServer.on('proxyRes', (proxyRes, req, res) => {
        const originalUrl = req.originalUrl ?? `${req.baseUrl || ''}${req.url}`;
        const pathUpToSearch = proxyRes.req.path.replace(/\?.*$/, '');
        const exchange = `[HPM] ${req.method} ${originalUrl} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${pathUpToSearch} [${proxyRes.statusCode}]`;
        proxy_events_counter.inc({
            target: proxyRes.req.host,
            proxystatus: proxyRes.statusCode,
            status: res.statusCode,
            errcode: null,
        });
        log.info(exchange);
    });

    /**
     * When client opens WebSocket connection
     */
    proxyServer.on('open', (socket) => {
        log.info('[HPM] Client connected: %o', socket.address());
    });

    /**
     * When client closes WebSocket connection
     */
    proxyServer.on('close', (req, proxySocket, proxyHead) => {
        log.info('[HPM] Client disconnected: %o', proxySocket.address());
    });
};

log.info(`Frackend startup: ${JSON.stringify({ NAIS_CLUSTER_NAME, MILJO, GIT_COMMIT })}`);

const BUILD_PATH = path.join(process.cwd(), '../build');

const proxyOptions = {
    logger: log,
    secure: true,
    xfwd: true,
    changeOrigin: true,
    ejectPlugins: true,
    plugins: [
        cookieScraperPlugin,
        debugProxyErrorsPlugin,
        errorResponsePlugin,
        loggerPlugin,
        proxyEventsPlugin,
    ],
};

const main = async () => {
    let appReady = false;
    const app = express();
    app.disable('x-powered-by');

    app.use(apiRateLimit);

    app.use('/{*splat}', (req, res, next) => {
        res.setHeader('NAIS_APP_IMAGE', NAIS_APP_IMAGE);
        next();
    });

    app.use(
        apiMetricsMiddleware({
            metricsPath: '/permittering/internal/metrics',
        })
    );

    app.use(
        '/permittering/api/stillingstitler',
        createProxyMiddleware({
            ...proxyOptions,
            headers: {
                'Nav-CallId': 'permittering-demo',
            },
            target:
                MILJO === 'local' || MILJO === 'demo'
                    ? 'https://pam-ontologi.intern.dev.nav.no/rest/typeahead/stilling'
                    : 'http://pam-ontologi.teampam/rest/typeahead/stilling',
        })
    );

    if (MILJO === 'dev') {
        (await import('./mocks/enhetsRegisteretMock.js')).mock(app);
    }
    if (MILJO === 'local' || MILJO === 'demo') {
        (await import('./mocks/apiMock.js')).mock(app);
        (await import('./mocks/enhetsRegisteretMock.js')).mock(app);
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
                ...proxyOptions,
                target: `${BACKEND_BASEURL}/permitteringsskjema-api`,
            })
        );

        app.get('/permittering/redirect-til-login', function (req, res) {
            const target = new URL(LOGIN_URL);
            target.searchParams.set('redirect', req.get('referer'));
            res.redirect(target.href);
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
    app.use('/permittering/', express.static(BUILD_PATH, {
        index: false,
        etag: false,
        maxAge: '1h',
    }));
    app.get('/permittering/{*splat}', (req, res) => {
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Etag', GIT_COMMIT);
        res.sendFile(path.join(BUILD_PATH, 'index.html'));
    });

    const server = app.listen(PORT, () => {
        log.info(`Server listening on port ${PORT}`);
        setTimeout(() => {
            appReady = true;
        }, 5_000);
    });

    const terminator = createHttpTerminator({
        server,
        gracefulTerminationTimeout: 30_000, // defaults: terminator=5s, k8s=30s
    });

    process.on('SIGTERM', () => {
        log.info('SIGTERM signal received: closing HTTP server');
        terminator.terminate();
    });
};

main()
    .then((_) => log.info('main started'))
    .catch((e) => log.error('main failed', e));
