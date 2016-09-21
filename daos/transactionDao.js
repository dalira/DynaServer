var Q = require('q');

var Transaction = require('../models/Transaction');
var EntityNotValidError = require('../errors/EntityNotValidError');

var service = {};

service.count = function (query) {
    var deferred = Q.defer();

    Transaction.count(query)
        .then(function (count) {
            deferred.resolve(count);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    page = Number(page - 1 || 0);
    limit = Number(limit || 20);

    Transaction.find(query).populate('to from sprint').skip(page * limit).limit(limit)
        .then(function(transactions){
            deferred.resolve(transactions);
        })
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