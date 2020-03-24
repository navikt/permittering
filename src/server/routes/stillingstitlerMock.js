const paths = require('../../paths');
const data = require('../../fixtures/stillingstitler');
module.exports = app => {
    app.get(paths.stillingstitlerPath, (req, res) => {
        if (req.query.q) {
            const filteredData = data.filter(row => {
                let matched = false;
                row.label
                    .toLowerCase()
                    .split(' ')
                    .forEach(word => {
                        if (word.startsWith(req.query.q.toLowerCase())) {
                            matched = true;
                        }
                    });
                return matched;
            });
            res.send(filteredData);
        } else {
            res.send([]);
        }
    });
};
