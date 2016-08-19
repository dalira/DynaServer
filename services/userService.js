var Q = require('q');
var userDAO = require('../daos/userDao');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

module.exports = function (app) {
    var service = {};

    service.exists = function (query) {
        return userDAO.exists(query);
    };

    service.query = function (query) {
        var deferred = Q.defer();

        var promise = userDAO.query(query);
        promise.then(deferred.resolve);
        promise.catch(deferred.reject);

        return deferred.promise;
    };

    service.create = function (user) {
        var deferred = Q.defer();

        var promise = userDAO.create(user);
        promise.then(deferred.resolve);
        promise.catch(deferred.reject);

        return deferred.promise;
    };

    service.update = function (user) {
        var deferred = Q.defer();

        var promise = userDAO.update(user);
        promise.then(deferred.resolve);
        promise.then(deferred.reject);

        return deferred.promise;
    };

    return service;
}();