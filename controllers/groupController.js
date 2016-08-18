var groupService = require('../services/groupService');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');
var BadRequestError = require('../models/errors/BadRequestError');

module.exports = function () {
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
            .then(function (newGroup) {
                res.json(newGroup);
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
                next(new BadRequestError("ID do PATH é diferetente do ID da entidade"));
            }
        }else{
            group._id = id;
        }

        groupService.update(group)
            .then(function () {
                res.send(group);
            })
            .catch(function (error) {
                next(error);
            });
    };

    controller.delete = function (req, res) {
        var id = req.params.id;
    };

    return controller;
}();