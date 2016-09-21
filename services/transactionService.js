var Q = require('q');
var transactionDao = require('../daos/transactionDao');

var sprintService = require('../services/sprintService');

var service = {};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    var items;
    transactionDao.query(query, page, limit)
        .then(function (sprints) {
            items = sprints;
            return transactionDao.count(query);
        })
        .then(function (totalQueryItems) {
            deferred.resolve({
                items: items,
                totalItems: totalQueryItems,
                currentPage: page
            });
        })
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