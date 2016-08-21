var Q = require('q');
//var transactionDao = require('../daos/transactionDao'); TODO:

var service = {};

service.query = function (query) {
    var deferred = Q.defer();

    var promise = transactionDao.query(query);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.create = function (transaction) {
    var deferred = Q.defer();

    var promise = transactionDao.create(transaction);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.update = function (transaction) {
    var deferred = Q.defer();

    var promise = transactionDao.update(transaction);
    promise.then(deferred.resolve);
    promise.then(deferred.reject);

    return deferred.promise;
};

module.exports = service;