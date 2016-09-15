var Q = require('q');
var transactionDao = require('../daos/transactionDao');

var sprintService = require('../services/sprintService');

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

    sprintService.getCurrentSprintByUser(transaction.from)
        .then(function (sprint) {
            transaction.sprint = sprint;
            transaction.date = new Date();

            return transactionDao.create(transaction);
        })
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