var Q = require('q');

var Sprint = require('../models/Sprint');
var EntityNotValidError = require('../errors/EntityNotValidError');

var service = {};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    page = page | 0;
    limit = limit | 20;

    Sprint.find(query).skip(page * limit).limit(limit).populate('group')
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