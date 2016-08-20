var Q = require('q');

var Configuration = require('../models/Configuration');

var service = {};

service.get = function () {
    var deferred = Q.defer();

    Configuration.findOne()
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.update = function (configuration) {
    var deferred = Q.defer();

    Configuration.update({}, configuration)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

module.exports = service;