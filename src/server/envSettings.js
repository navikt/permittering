function createEnvSettingsFile() {
  return `window.appSettings = {
            MILJO: "${process.env.NAIS_CLUSTER_NAME}",
        };`;
}
module.exports = createEnvSettingsFile;
