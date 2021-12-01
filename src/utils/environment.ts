const environment = () => {
    return {
        MILJO: (window as any).appSettings.MILJO,
        LOGIN_URL: (window as any).appSettings.LOGIN_URL,
    };
};

export default environment();
