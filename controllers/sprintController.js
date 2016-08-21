var sprintService = require('../services/sprintService');
var EntityAlreadyExistError = require('../errors/EntityAlreadyExistError');

var controller = {};

controller.getById = function (req, res, next) {
    var id = req.params.id;
    var query = {_id: id};

    sprintService.query(query)
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

    sprintService.query(query)
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

    sprintService.create(user)
        .then(function () {
            res.sendStatus(201);
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

    sprintService.update(user)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(function (error) {
            next(error);
        });
};

module.exports = controller;