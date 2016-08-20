var userService = require('../services/userService');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

var controller = {};

controller.getById = function (req, res, next) {
    var id = req.params.id;
    var query = {_id: id};

    userService.query(query)
        .then(function (users) {
            var user = users[0];
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            next(err);
        });
};

controller.query = function (req, res, next) {
    var query = req.query;

    userService.query(query)
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            next(err);
        });
};

controller.create = function (req, res, next) {
    var user = req.body;

    if (user.id) {
        next(new EntityAlreadyExistError());
    }

    userService.create(user)
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
    } else {
        user._id = id;
    }

    userService.update(user)
        .then(function (updatedUser) {
            res.json(updatedUser);
        })
        .catch(function (error) {
            next(error);
        });
};

module.exports = controller;