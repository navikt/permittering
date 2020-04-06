const jsdom = require('jsdom');
const request = require('request');

const { JSDOM } = jsdom;
url = '';
if (process.env.NAIS_CLUSTER_NAME === 'prod-sbs') {
    url =
        'https://appres.nav.no/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true&skiplinks=true&megamenu-resources=false';
} else {
    url =
        'https://appres-q1.nav.no/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true&skiplinks=true&megamenu-resources=false';
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
                    NAV_HEADING: document.getElementById('header')[prop],
                    NAV_FOOTER: document.getElementById('footer')[prop],
                };
                resolve(data);
            } else {
                reject(new Error(error));
            }
        };

        requestDecorator(callback);
    });

module.exports = getDecorator;
