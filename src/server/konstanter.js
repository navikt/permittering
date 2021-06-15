const FRONTEND_BASE_URL = '/permittering';
const FRONTEND_API_PATH = '/api';
const BACKEND_API_PATH = process.env.BACKEND_API_PATH || '/permitteringsskjema-api';
const BACKEND_BASEURL = process.env.BACKEND_BASEURL || 'http://localhost:8080';

const IDPORTEN_WELL_KNOWN_URL =
    process.env.IDPORTEN_WELL_KNOWN_URL ||
    'http://localhost:9000/aad/.well-known/openid-configuration';
const IDPORTEN_CLIENT_ID = process.env.IDPORTEN_CLIENT_ID || 'permittering-test-client-id';
const testJwk = JSON.stringify({
    p:
        '36qWbr6zTCe4xM3OLpT_x9mcSbNvnx9Sr-z9GHHS4aCQS7JWirw3ez-8vWM71jypLIbUUj7ym_Dbd98IJtc9S6o8j5QejC92Y5EJqtnmKEkKnD4HWLPruCIf8mPlWFPsQQxHeAB6vv1ki036cfaHnmlV7_Fsv2ftYKHfp86-ozE',
    kty: 'RSA',
    q:
        '19dG8TqsgmvM37F5C_0V0EjBXd2FcJQUkeoZbZRBcAGeoFyDklkMuUwlIogF0fQPrp-UBoCoY_efz5Y4Y_jR00W9xpPcb2spC9UdmMRVaw6YhKHY1NOdvF_9pV8hI5QtpSglaCr9o6lCp78_wELjZe7-tFcZyN7C-LvyX63W7qc',
    d:
        'MK-8k59azRASyjD59fPySFdeo4BzHYsjObZ5Vxmblz2uD4CDKgLldQzG7ELiO4FCDhfpQklQFTpa1wIt-wFFMYW3-crTJv3gC-s3u5215yZIQ3ilMQXdXliultOQKGUnm9QHaTW0RZpgwOmOe4iRkbunrCUTPhbmiAJWzOXg1KtMAcc_q1-F5n1YpplzKLAORgRYcvfwaEKLag-FHQgqfokTp8-Lm2zWQ_2xr34ifKuQFWi79M8PMdpMzExGVoc_rDBbweXt4CxuZQTUzYp_F9D-RP4XOPl1Xb1kVXb5vW-dw3QlFHWOszwb7GK0GLHahJrs6sUHZ4I2HIHvrRPbAQ',
    e: 'AQAB',
    use: 'sig',
    kid: 'test-id',
    qi:
        'heuqSTOqX0terJoTuYmudRYuldWg52KU4U-hsEFSYiOoGCuY5O-Wkqs66i28gGOlFAaU9rGvxIQd1ro9ag1TiZxyWPPtrVdyD-HwNYs11tdROTZ8lVFs6OYj3NhwZYd5TXpq4HNf-jf7yru2NF7jSWg6UR1TBXeBTHchQKdgnTo',
    dp:
        'Wi8VUvgPoYBOrwPww7WOYM2sh8cTFczycT8UWhvjFNjB9dOls3DqygZMGuz9PofdCrgeuj7pYdk_FNlYFxkofO7aVmY53vpwOPtNM5eChvHUlmUoXyrEu8z-pqSC4BeOpjfGRWukEohnVwgNGJB35HbCkOn-mDrWauU6IhZppbE',
    alg: 'RS256',
    dq:
        'hGbwg8XkUNTkBkyN3obPvMcEpxneY2LTA3dBRfDt-1FjByf5JesuXPSSyw351AMNI6eMXDjMExaxl9ukl97oh9t-QLQvQsHPmgyPbUjyxQtdD-9gXZ26YvXXWHx0jai2H1vzJmVI1f5cfx5Ycw4VBFCJOgM8M_ZCT-arFXpEIH0',
    n:
        'vJRalsEoApXYdEFsrYo7QOcM36shQXTQvyXuiJPzqq-WpwOM7dCLUQJ7HRO07kKJAfdldwV7j1k1KELjwUozXQC_uGL28xByaP3BZ5JcTmBWz_X2tIRkxOcj8QYJYUaRBWF8gjISkbZC_Cli94NI5qkdSegGV4tjHYwGhk3qX1Pp0NULhxmfdiiMtkMj2PEGQGxl87tgUQrWjBZj1pcn-d7Tnw8uUNMt5tfqCzVXQcJefkuPTOetvFMSyMk8ismd1uxLie1sQ4I-KFnD9OMLVAHfuXNtLrQoPaYJVzqE7ix3f9y5kS8VMn8-UN42gxm6AMenJ0TXJFaAUnGAogoC9w',
});
const IDPORTEN_CLIENT_JWK = JSON.parse(process.env.IDPORTEN_CLIENT_JWK || testJwk);
const IDPORTEN_REDIRECT_URI =
    process.env.IDPORTEN_REDIRECT_URI || 'http://localhost:3000/permittering/oauth2/callback';
const IDPORTEN_POST_LOGOUT_REDIRECT_URI =
    process.env.IDPORTEN_POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/permittering/';

const TOKEN_X_WELL_KNOWN_URL =
    process.env.TOKEN_X_WELL_KNOWN_URL ||
    'http://localhost:9000/tokenx/.well-known/openid-configuration';
const TOKEN_X_CLIENT_ID = process.env.TOKEN_X_CLIENT_ID || 'tokenx-client-id';
const TOKEN_X_PRIVATE_JWK = JSON.parse(process.env.TOKEN_X_PRIVATE_JWK || testJwk);

const LOGIN_URL = process.env.LOGIN_URL;

const PERMITTERING_SESSION_SECRET = process.env.PERMITTERING_SESSION_SECRET || 'secret';
const PERMITTERING_SESSION_NAME = process.env.PERMITTERING_SESSION_NAME || 'permittering-session';

const API_AUDIENCE = process.env.API_AUDIENCE || 'tokenx';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_PORT = process.env.REDIS_PORT;

module.exports = {
    API_AUDIENCE,
    IDPORTEN_WELL_KNOWN_URL,
    IDPORTEN_CLIENT_ID,
    IDPORTEN_CLIENT_JWK,
    IDPORTEN_REDIRECT_URI,
    IDPORTEN_POST_LOGOUT_REDIRECT_URI,
    TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK,
    LOGIN_URL,
    PERMITTERING_SESSION_SECRET,
    PERMITTERING_SESSION_NAME,
    FRONTEND_API_PATH,
    FRONTEND_BASE_URL,
    BACKEND_API_PATH,
    BACKEND_BASEURL,
    REDIS_HOST,
    REDIS_PASSWORD,
    REDIS_PORT,
};