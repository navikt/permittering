const CracoLessPlugin = require('craco-less');

const eslint = {
    enable: true,
    mode: 'extends',
    configure: {
        extends: 'react-app',
    },
};

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    eslint,
};
