var groupService = require('../services/groupService');
var EntityAlreadyExistError = require('../errors/EntityAlreadyExistError');
var BadRequestError = require('../errors/BadRequestError');

var controller = {};

controller.query = function (req, res, next) {
    var query = req.query;

    groupService.query(query)
        .then(function (groups) {
            res.json(groups);
        })
        .catch(function (err) {
            next(err);
        });
};

controller.create = function (req, res, next) {
    var group = req.body;

    if (group.id) {
        next(new EntityAlreadyExistError());
    }

    groupService.create(group)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (error) {
            next(error);
        });
};

controller.update = function (req, res, next) {
    var id = req.params.id;
    var group = req.body;

    if (group._id) {
        if (id != group._id) {
            next(new BadRequestError("ID do PATH é diferente do ID da entidade"));
        }
    } else {
        group._id = id;
    }

    groupService.update(group)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(function (error) {
            next(error);
        });
};

module.exports = controller;