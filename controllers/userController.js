var service = require('../services/userService');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

module.exports = function () {
    var controller = {};

    controller.query = function (req, res) {
        var query = req.query;

        service.exists(query)
            .then(function (exist) {
                res.json(exist);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    controller.create = function (req, res, next) {
        var user = req.body;

        if (user.id) {
            next(new EntityAlreadyExistError());
        }

        service.create(user)
            .then(function (newUser) {
                res.json(newUser);
            })
            .catch(function (error) {
                next(error);
            });
    };

    controller.update = function (req, res) {
        var id = req.params.id;

        service.create(user)
            .then(function (updatedUser) {
                res.end(200);
            })
            .catch(function (error) {
                throw error;
            });
    };

    controller.delete = function (req, res) {
        var id = req.params.id;
    };

    return controller;
};