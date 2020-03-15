const app = require('express')();
const internalRoutes = require('./routes/internals');
const indexRoute = require('./routes/indexPath');
const loginRoutes = require('./routes/login');
const mellomLagringRoutes = require('./routes/mellomlagring');
const storageClient = require('./StorageMock'); // Foreløpig lagring av søknader

const startServer = (app, port) => {
  console.log('start server');
  loginRoutes(app);
  mellomLagringRoutes(app, storageClient);
  internalRoutes(app);
  indexRoute(app);
  app.listen(port, () => {
    console.log('Server listening on port', port);
  });
};

startServer(app, process.env.PORT || 3000);
