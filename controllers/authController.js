var UnauthorizedUserError = require('../errors/UnauthorizedUserError');

module.exports = function (app) {

    var authService = require('../services/authService')(app);

    var controller = {};

    controller.auth = function (req, res, next) {
        var login = req.body.login;
        var password = req.body.password;

        authService.createAuthToken(login, password)
            .then(function (token) {
                res.writeHead(200, {'Authorization': `JWT ${token}`});
                res.end();
            }, function (err) {
                console.log(err);
                next(new UnauthorizedUserError());
            });

    };

    controller.getAuthUser = function (req, res, next) {
        if (req.user) {
            res.json(req.user);
        }else{
            res.sendStatus(404);
        }
    };

    return controller;

};