const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const { Issuer, Strategy } = require('openid-client');
const mustacheExpress = require('mustache-express');
const getDecorator = require('./routes/decorator');
const { getConfiguredRouter } = require('./routes/router');
const port = process.env.PORT || 3000;
const path = require('path');
const buildPath = path.join(__dirname, '../../build');
const {
    PERMITTERING_SESSION_SECRET,
    PERMITTERING_SESSION_NAME,
    IDPORTEN_WELL_KNOWN_URL,
    IDPORTEN_CLIENT_ID,
    IDPORTEN_REDIRECT_URI,
    IDPORTEN_CLIENT_JWK,
    TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK,
} = require('./konstanter');
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', buildPath);

let idPortenIssuer = null;
let tokenXIssuer = null;

const getConfiguredIDportenClient = async () => {
    const issuer = await Issuer.discover(IDPORTEN_WELL_KNOWN_URL);
    console.log(`Discovered issuer ${issuer.issuer}`);
    idPortenIssuer = issuer.issuer;
    return new issuer.Client(
        {
            client_id: IDPORTEN_CLIENT_ID,
            redirect_uris: [IDPORTEN_REDIRECT_URI],
            token_endpoint_auth_method: 'private_key_jwt',
            token_endpoint_auth_signing_alg: 'RS256',
        },
        {
            keys: [IDPORTEN_CLIENT_JWK],
        }
    );
};

const getConfiguredTokenXClient = async () => {
    const issuer = await Issuer.discover(TOKEN_X_WELL_KNOWN_URL);
    console.log(`Discovered issuer ${issuer.issuer}`);
    tokenXIssuer = issuer.token_endpoint;
    return new issuer.Client(
        {
            client_id: TOKEN_X_CLIENT_ID,
            token_endpoint_auth_method: 'private_key_jwt',
            token_endpoint_auth_signing_alg: 'RS256',
        },
        {
            keys: [TOKEN_X_PRIVATE_JWK],
        }
    );
};

const sessionOptions = {
    cookie: {
        maxAge: 3600000, // One hour
        sameSite: 'lax',
        httpOnly: true,
    },
    secret: PERMITTERING_SESSION_SECRET,
    name: PERMITTERING_SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
};

const strategy = client => {
    console.log('creating strategy with client', client);
    const verify = (tokenSet, done) => {
        if (tokenSet.expired()) {
            return done(null, false);
        }
        const user = {
            tokenSets: {
                self: tokenSet,
            },
            claims: tokenSet.claims(),
        };
        return done(null, user);
    };
    const options = {
        client: client,
        params: {
            response_types: ['code'],
            response_mode: 'query',
            scope: `openid profile`,
            resource: 'https://nav.no',
        },
        extras: {
            clientAssertionPayload: {
                aud: idPortenIssuer,
            },
        },
        passReqToCallback: false,
        usePKCE: 'S256',
        sessionKey: PERMITTERING_SESSION_NAME,
    };
    return new Strategy(options, verify);
};

const renderApp = decoratorFragments =>
    new Promise((resolve, reject) => {
        app.render('index.html', (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = async html => {
    app.use(session(sessionOptions));
    const idPortenClient = await getConfiguredIDportenClient();
    const tokenXClient = await getConfiguredTokenXClient();
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
    passport.use('idPortenOIDC', strategy(idPortenClient));

    console.log('start regular server');
    const router = getConfiguredRouter(tokenXClient, tokenXIssuer, html);
    app.use('/', router);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

/**
 * Config for running the regular server
 *
 * @param app
 * @param p
 */
// renderApp().then(html => {
//     startServer(html);
// });

getDecorator()
    .then(renderApp, error => {
        console.error('Kunne ikke hente dekoratør ', error);
        process.exit(1);
    })
    .then(startServer, error => {
        console.error('Kunne ikke rendre app ', error);
        process.exit(1);
    });
