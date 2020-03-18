const CracoLessPlugin = require("craco-less");

const eslint = {
  enable: true,
  mode: "extends",
  configure: {
    extends: "react-app",
    rules: {
      // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ
      // https://github.com/yannickcr/eslint-plugin-react/issues/1654
      "react/jsx-pascal-case": "off"
    }
  }
};

module.exports = {
  devServer: {
    before: app => {
      app.get("/permittering/redirect-til-login", (req, res) => {
        const loginUrl =
          "http://localhost:8080/permitteringsskjema-api/local/cookie?redirect=http://localhost:3000/permittering";
        res.redirect(loginUrl);
      });
    }
  },
  plugins: [{ plugin: CracoLessPlugin }],
  eslint
};
