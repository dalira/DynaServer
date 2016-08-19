var service = require('../services/userService');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

module.exports = function () {
    var controller = {};

    controller.query = function (req, res, next) {
        var query = req.query;

        service.query(query)
            .then(function (exist) {
                res.json(exist);
            })
            .catch(function (err) {
                next(error);
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

    controller.update = function (req, res, next) {
        var id = req.params.id;
        var user = req.body;

        if (user._id) {
            if (id != user._id) {
                next(new BadRequestError("ID do PATH é diferente do ID da entidade"));
            }
        }else{
            user._id = id;
        }

        service.update(user)
            .then(function (updatedUser) {
                res.json(updatedUser);
            })
            .catch(function (error) {
                next(error);
            });
    };

    controller.delete = function (req, res) {
        var id = req.params.id;
    };

    return controller;
};