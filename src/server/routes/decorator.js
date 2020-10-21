const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;

url = '';
if (process.env.NAIS_CLUSTER_NAME === 'prod-sbs') {
    url =
        'https://www.nav.no/dekoratoren/?context=arbeidsgiver&breadcrumbs=[{"url":"https://arbeidsgiver.nav.no/permittering","title":"Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"}]';
} else {
    url =
        'https://www-q1.nav.no/dekoratoren/?context=arbeidsgiver&breadcrumbs=[{"url":"https://arbeidsgiver-q.nav.no/permittering","title":"Skjema til NAV om permitteringer, oppsigelser, eller innskrenkning i arbeidstid"}]';
}

const requestDecorator = callback => request(url, callback);

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                const { document } = new JSDOM(body).window;
                const prop = 'innerHTML';

                const data = {
                    NAV_SCRIPTS: document.getElementById('scripts')[prop],
                    NAV_STYLES: document.getElementById('styles')[prop],
                    NAV_SKIPLINKS: document.getElementById('skiplinks')[prop],
                    NAV_HEADING: document.getElementById('header-withmenu')[prop],
                    NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
                    NAV_MENU_RESOURCES: document.getElementById('megamenu-resources')[prop],
                };
                resolve(data);
            } else {
                reject(new Error(error));
            }
        };

        requestDecorator(callback);
    });

module.exports = getDecorator;
