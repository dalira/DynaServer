var Q = require('q');

var Transaction = require('../models/Transaction');
var EntityNotValidError = require('../errors/EntityNotValidError');

var service = {};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    page = page | 0;
    limit = limit | 20;

    Transaction.find(query).skip(page * limit).limit(limit)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.create = function (transaction) {
    var deferred = Q.defer();

    Transaction.create(transaction)
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

service.update = function (transaction) {
    var deferred = Q.defer();

    Transaction.findOneAndUpdate({_id: transaction._id}, transaction)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};


module.exports = service;