var Q = require('q');
var groupDAO = require('../daos/groupDao');

var service = {};

service.exists = function (query) {
    return groupDAO.exists(query);
};

service.query = function (query) {
    var deferred = Q.defer();

    var promise = groupDAO.query(query);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.create = function (user) {
    var deferred = Q.defer();

    var promise = groupDAO.create(user);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.update = function (user) {
    var deferred = Q.defer();

    var promise = groupDAO.update(user);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

module.exports = service;
