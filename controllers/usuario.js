var service = require('../services/usuario');

module.exports = function () {
    var controller = {};

    controller.query = function (req, res) {
        var query = req.query;

        service.query(query)
            .then(function (usuarios) {
                res.json(usuarios);
            })
            .catch(function () {

            });
    };

    controller.create = function (req, res) {
        var user = req.body;

        service.create(user)
            .then(function (newUser) {
                res.json(newUser);
            })
            .catch(function () {

            });
    };

    controller.update = function (req, res) {
        var id = req.params.id;
    };

    controller.delete = function (req, res) {
        var id = req.params.id;
    };

    return controller;
};