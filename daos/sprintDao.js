var Q = require('q');

var Sprint = require('../models/Sprint');
var EntityNotValidError = require('../errors/EntityNotValidError');

var service = {};

service.count = function (query) {
    var deferred = Q.defer();

    Sprint.count(query)
        .then(function (count) {
            deferred.resolve(count);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    page = Number(page || 0) - 1;
    limit = Number(limit || 20);

    Sprint.find(query).populate('group').skip(page * limit).limit(limit)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.create = function (sprint) {
    var deferred = Q.defer();

    Sprint.create(sprint)
        .then(deferred.resolve)
        .catch(function (err) {
            if (err.name === 'ValidationError') {
                deferred.reject(new EntityNotValidError());
            } else {
                deferred.reject(err);
            }
        });

    return deferred.promise;
};

service.update = function (sprint) {
    var deferred = Q.defer();

    Sprint.findOneAndUpdate({_id: sprint._id}, sprint)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};


module.exports = service;