const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsPath) {
    fsExtra.ensureFile(settingsPath).then(f => {
        fsExtra.writeFileSync(
            settingsPath,
            `window.appSettings = {
                MILJO: '${process.env.CLUSTER}',
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
