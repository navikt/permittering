function createEnvSettingsFile() {
    const settings = JSON.stringify({
        MILJO: process.env.NAIS_CLUSTER_NAME || 'local',
        LOGIN_URL: process.env.LOGIN_URL,
    });
    return `window.appSettings = ${settings};`;
}
module.exports = createEnvSettingsFile;
