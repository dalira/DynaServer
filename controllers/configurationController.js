var configurationService = require('../services/configurationService');

var controller = {};

controller.get = function (req, res, next) {

    configurationService.get()
        .then(function (configuration) {
            res.json(configuration);
        })
        .catch(function (err) {
            next(err);
        });
};

controller.update = function (req, res, next) {
    var configuration = req.body;

    configurationService.update(configuration)
        .then(function (newConfiguration) {
            res.json(newConfiguration);
        })
        .catch(function (error) {
            next(error);
        });
};

module.exports = controller;