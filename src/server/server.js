const express = require('express');
const app = express();
const { Issuer } = require('openid-client');
const { getConfiguredRouter } = require('./routes/router');
const { getConfiguredMockRouter } = require('./routes/mockRouter');
const port = process.env.PORT || 3000;
const { TOKEN_X_WELL_KNOWN_URL, TOKEN_X_CLIENT_ID, TOKEN_X_PRIVATE_JWK } = require('./konstanter');

let tokenXIssuer = null;

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

const startServer = async () => {
    console.log(`Starting server on cluster ${process.env.NAIS_CLUSTER_NAME}`);
    // if (process.env.NAIS_CLUSTER_NAME === 'labs-gcp') {
    const router = getConfiguredMockRouter();
    app.use('/', router);
    app.listen(port, () => {
        console.log('Server listening on port (ONLY RETURNING MOCK DATA)', port);
    });
    // } else {
    //     const tokenXClient = await getConfiguredTokenXClient();
    //
    //     console.log('start regular server');
    //     const router = getConfiguredRouter(tokenXClient, tokenXIssuer);
    //     app.use('/', router);
    //     app.listen(port, () => {
    //         console.log('Server listening on port', port);
    //     });
    // }
};

const startServerWithDecorator = () => {
    startServer();
};

startServerWithDecorator();
