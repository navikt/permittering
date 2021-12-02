const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const decoratorConfig = {
    env: process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev',
    context: 'arbeidsgiver',
    language: 'nb',
    logoutUrl:
        process.env.NAIS_CLUSTER_NAME === 'prod-gcp'
            ? 'https://arbeidsgiver.nav.no/permittering/oauth2/logout'
            : 'https://permitteringsskjema.dev.nav.no/permittering/oauth2/logout',
};

console.log('Bruker dekoratør med følgende config: ', decoratorConfig);

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        ...decoratorConfig,
        filePath: filePath,
    });

module.exports = { getHtmlWithDecorator };
