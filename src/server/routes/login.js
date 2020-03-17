const paths = require("../../paths");
module.exports = app => {
  app.get(paths.redirectTilLoginPath, (req, res) => {
    const loginUrl =
      process.env.LOGIN_URL ||
      "http://localhost:8080/ditt-nav-arbeidsgiver-api/local/selvbetjening-login?redirect=http://localhost:3000/arbeidsforhold";
    res.redirect(loginUrl);
  });
};
