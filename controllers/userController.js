var userService = require('../services/userService');
var EntityAlreadyExistError = require('../errors/EntityAlreadyExistError');

var controller = {};

controller.getByLogin = function (req, res, next) {
    var login = req.params.login;
    var query = {login: login};

    userService.query(query)
        .then(function (users) {
            var user = users[0];
            if (user) {
                var obj = user.toObject();
                delete obj['password'];
                res.json(obj);
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

    if (query['group']) {
        query['group'] = {_id : query['group']}
    }

    var page = query._page;
    var limit = query._limit;
    delete query['_page'];
    delete query['_limit'];

    var items;
    userService.query(query, page, limit)
        .then(function (sprints) {
            items = sprints;
            return userService.count(query);
        })
        .then(function (totalQueryItems) {
            res.json({
                items: items,
                totalItems: totalQueryItems,
                currentPage: page
            });
        })
        .catch(next);
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
    var login = req.params.login;
    var user = req.body;

    if (user.login) {
        if (login != user.login) {
            next(new BadRequestError("Login do PATH é diferente do login da entidade"));
        }
    } else {
        user.login = login;
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