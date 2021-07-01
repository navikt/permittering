const paths = require('../../paths');
const data = require('../../fixtures/stillingstitler');
module.exports = (app) => {
    app.get(paths.stillingstitlerPath, (req, res) => {
        if (req.query.q) {
            const filteredData = data.typeaheadYrkeList.filter((row) => {
                let matched = false;
                row.label
                    .toLowerCase()
                    .split(' ')
                    .forEach((word) => {
                        if (word.startsWith(req.query.q.toLowerCase())) {
                            matched = true;
                        }
                    });
                return matched;
            });
            const result = {
                typeaheadYrkeList: filteredData,
            };
            res.send(result);
        } else {
            res.send([]);
        }
    });
};
