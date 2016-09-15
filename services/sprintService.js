var Q = require('q');

var sprintDao = require('../daos/sprintDao');
var ConfigurationService = require('../services/configurationService');

var service = {};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    var items;
    sprintDao.query(query, page, limit)
        .then(function (sprints) {
            items = sprints;
            return sprintDao.count(query);
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

service.create = function (sprint) {
    var deferred = Q.defer();

    sprintDao.create(sprint)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};

service.update = function (sprint) {
    var deferred = Q.defer();

    sprintDao.update(sprint)
        .then(deferred.resolve)
        .then(deferred.reject);

    return deferred.promise;
};

service.getCurrentSprintByUser = function (user){
    var deferred = Q.defer();

    sprintDao.getCurrentSprintByUser(user)
        .then(deferred.resolve)
        .then(deferred.reject);

    return deferred.promise;
}

module.exports = service;