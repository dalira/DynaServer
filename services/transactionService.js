var Q = require('q');
var transactionDao = require('../daos/transactionDao');

var service = {};

service.query = function (query) {
    var deferred = Q.defer();

    transactionDao.query(query)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.create = function (transaction) {
    var deferred = Q.defer();

    transactionDao.create(transaction)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.update = function (transaction) {
    var deferred = Q.defer();

    transactionDao.update(transaction)
        .then(deferred.resolve)
        .then(deferred.reject);

    return deferred.promise;
};

module.exports = service;