var Q = require('q');
var jsonwebtoken = require('jsonwebtoken');

var userService = require('../services/userService');

var UnauthorizedUserError = require('../errors/UnauthorizedUserError');

module.exports = function (app) {

    var service = {};

    service.createAuthToken = function (login, password) {
        var deferred = Q.defer();

        userService.verifyPassword(login, password)
            .then(function (valid) {
                if (valid) {
                    jsonwebtoken.sign({login: login}, app.get('secret'), {expiresIn: '24h'}, function (err, token) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(token);
                        }
                    });
                } else {
                    deferred.reject(new UnauthorizedUserError());
                }
            })
            .catch(deferred.reject);

        return deferred.promise;
    };

    return service;

};



