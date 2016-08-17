var service = require('../services/usuario');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

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

        if (user.id) {
            throw new EntityAlreadyExistError();
        }

        service.create(user)
            .then(function (newUser) {
                res.json(newUser);
            })
            .catch(function (error) {
                throw error;
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