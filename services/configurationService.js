var Q = require('q');
var configurationDAO = require('../daos/configurationDao');

var service = {};

service.get = function () {
    var deferred = Q.defer();

    configurationDAO.get()
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.update = function (configuration) {
    var deferred = Q.defer();

    configurationDAO.update(configuration)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

module.exports = service;
