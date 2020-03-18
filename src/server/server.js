const app = require("express")();
const internalRoutes = require("./routes/internals");
const indexRoute = require("./routes/indexPath");
const loginRoutes = require("./routes/login");
const apiProxy = require("./routes/apiProxy");
const createEnvSettingsFile = require("./envSettings.js");
const path = require("path");
const buildPath = path.join(__dirname, "../../build");

const BASE_PATH = "/permittering";
const veilarbStatusProxyConfig = require("./veilarbStatusProxyConfig");

app.use(`${BASE_PATH}/veilarbstepup/status`, veilarbStatusProxyConfig);

createEnvSettingsFile(path.resolve(`${buildPath}/static/js/settings.js`));

/*
app.get(`${BASE_PATH}/redirect-til-login`, (req, res) => {

  const loginUrl =
    process.env.LOGIN_URL ||
    "http://localhost:8080/permitteringsskjema-api/local/cookie?redirect=http://localhost:3000/permittering";
  res.redirect(loginUrl);
});
*/
const startServer = (app, port) => {
  console.log("start server");
  loginRoutes(app);
  apiProxy(app);
  internalRoutes(app);
  indexRoute(app);
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
};

const startMockServer = html => {
  console.log("start server");
  loginRoutes(app);
  apiProxy(app);
  internalRoutes(app);
  indexRoute(app);
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
};

if (process.env.REACT_APP_MOCK) {
  startMockServer();
} else {
  startServer(app, process.env.PORT || 3000);
}
