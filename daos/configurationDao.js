var Q = require('q');

var Configuration = require('../models/Configuration');

var service = {};

service.get = function () {
    var deferred = Q.defer();

    Configuration.findOne({}, "-_id -__v")
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.update = function (configuration) {
    var deferred = Q.defer();

    Configuration.create(configuration)
        .then(function(newConf){
            var obj = newConf.toObject();
            delete obj['_id'];
            deferred.resolve(obj);
        })
        .catch(function(err) {
            deferred.reject(err);
        });

    return deferred.promise;
};

module.exports = service;