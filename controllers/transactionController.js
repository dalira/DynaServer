var transactionService = require('../services/transactionService');
var EntityAlreadyExistError = require('../errors/EntityAlreadyExistError');

var controller = {};

controller.getById = function (req, res, next) {
    var id = req.params.id;
    var query = {_id: id};

    transactionService.query(query)
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

    transactionService.query(query)
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            next(err);
        });
};

controller.create = function (req, res, next) {
    var transaction = req.body;

    if (transaction.id) {
        next(new EntityAlreadyExistError());
    }

    transactionService.create(transaction)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (error) {
            next(error);
        });
};

controller.update = function (req, res, next) {
    var id = req.params.id;
    var transaction = req.body;

    if (transaction._id) {
        if (id != transaction._id) {
            next(new BadRequestError("ID do PATH é diferente do ID da entidade"));
        }
    } else {
        transaction._id = id;
    }

    transactionService.update(transaction)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(function (error) {
            next(error);
        });
};

module.exports = controller;