var Q = require('q');

var User = require('../models/User');
var EntityNotValidError = require('../errors/EntityNotValidError');

var service = {};

service.findById = function (id) {
    var deferred = Q.defer();

    User.findById(id)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.query = function (query) {
    var deferred = Q.defer();

    User.find(query)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.create = function (user) {
    var deferred = Q.defer();

    var promise = User.create(user)
        .then(deferred.resolve)
        .catch(function (err) {
            if (err.name === 'ValidationError') {
                deferred.reject(new EntityNotValidError());
            } else if (err.name === 'MongoError') {
                if (err.code === 11000) {
                    //Erro de valor unico duplicado
                    deferred.reject(new EntityNotValidError());
                }
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

module.exports = service;