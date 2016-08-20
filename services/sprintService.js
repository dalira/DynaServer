var Q = require('q');
var sprintDao = require('../daos/sprintDao');

var service = {};

service.query = function (query) {
    var deferred = Q.defer();

    var promise = sprintDao.query(query);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.create = function (sprint) {
    var deferred = Q.defer();

    var promise = sprintDao.create(sprint);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.update = function (sprint) {
    var deferred = Q.defer();

    var promise = sprintDao.update(sprint);
    promise.then(deferred.resolve);
    promise.then(deferred.reject);

    return deferred.promise;
};


module.exports = service;