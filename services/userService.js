var Q = require('q');
var usuarioDAO = require('../daos/userDao.js');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

module.exports = function (app) {
    var service = {};

    service.exists = function (query) {
        return usuarioDAO.exists(query);
    };

    service.query = function (query) {
        var deferred = Q.defer();

        setTimeout(function () {
            //Verificar se não existe

            //Salvar

            deferred.fulfill([{id: 1}]);
        }, 2000);

        return deferred.promise;
    };

    service.create = function (user) {
        var deferred = Q.defer();

        var promise = usuarioDAO.create(user);
        promise.then(deferred.resolve);
        promise.catch(function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    service.update = function (user) {
        var deferred = Q.defer();

        var promise = usuarioDAO.update(user);
        promise.then(deferred.resolve);
        promise.then(deferred.reject);

        return deferred.promise;
    };

    return service;
}();