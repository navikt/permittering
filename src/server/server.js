const server = express();

const startMockServer = html => {
    console.log('start server');
    server.use(BASE_PATH, express.static(buildPath));

    setInternalEndpoints();

    server.get(`${BASE_PATH}/*`, (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
    server.listen(port, () => {
        console.log('Server listening on port', port);
    });
};

const setInternalEndpoints = () => {
    server.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));
};

if (process.env.REACT_APP_MOCK) {
    startMockServer();
}