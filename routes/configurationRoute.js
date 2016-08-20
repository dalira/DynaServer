const PATH = '/configuracao';

var configurationController = require('../controllers/configurationController');

module.exports = function (app) {

    app.route(PATH)
        .get(configurationController.get)
        .put(configurationController.update);

};
