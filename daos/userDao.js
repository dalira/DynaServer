var Q = require('q');

var User = require('../models/User');
var EntityNotValidError = require('../models/errors/EntityNotValidError');

module.exports = function (app) {
    var service = {};

    service.exists = function (query) {
        var deferred = Q.defer();

        promise = User.findOne(query)
            .then(function (user) {
                deferred.resolve((!user));
            })
            .catch(promise.reject);

        return deferred.promise;
    };

    service.query = function (query, page, limit) {
        var deferred = Q.defer();

        page = page | 0;
        limit = limit | 20;

        User.find(query).skip(page * limit).limit(limit).populate('group')
            .then(deferred.resolve)
            .catch(deferred.reject);

        return deferred.promise;
    };

    service.create = function (user) {
        var deferred = Q.defer();

        var promise = User.create(user)
            .then(function (newUser) {
                User.populate(newUser, {path: 'group'})
                    .then(deferred.resolve)
                    .catch(deferred.reject);
            })
            .catch(function (err) {
                if (err.name === 'ValidationError') {
                    deferred.reject(new EntityNotValidError());
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    };

    service.update = function (user) {
        var deferred = Q.defer();

        User.findOneAndUpdate({_id: user._id}, user)
            .then(deferred.resolve)
            .catch(deferred.reject);

        return deferred.promise;
    };

    return service;
}();

