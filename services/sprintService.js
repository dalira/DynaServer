var Q = require('q');

var sprintDao = require('../daos/sprintDao');
var ConfigurationService = require('../services/configurationService');

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = ONE_DAY * 7;

var service = {};

service.query = function (query, page, limit) {
    var deferred = Q.defer();

    sprintDao.query(query, page, limit)
        .then(function (sprints) {

            sprintDao.count(query)
                .then(function (totalQueryItems) {
                    deferred.resolve({
                        items: sprints,
                        totalItems: totalQueryItems,
                        currentPage: page
                    });
                })
                .catch(deferred.reject);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

service.create = function (sprint) {
    var deferred = Q.defer();

    setEndOfSprint(sprint)
        .then(function (adjustedSprint) {
            sprintDao.create(adjustedSprint)
                .then(deferred.resolve)
                .catch(deferred.reject);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

service.update = function (sprint) {
    var deferred = Q.defer();

    setEndOfSprint(sprint)
        .then(function (adjustedSprint) {
            sprintDao.update(adjustedSprint)
                .then(deferred.resolve)
                .then(deferred.reject);
        })
        .catch(deferred.reject);

    return deferred.promise;
};


module.exports = service;


var setEndOfSprint = function (sprint, configuration) {
    var defered = Q.defer();



    return defered.promise;
};

var getSprintPeriod = function (sprint) {

    var isNew = !sprint_id;

    if (isNew) {

    }

    ConfigurationService.get()
        .then(function (configuration) {

            var duration = configuration.duration;
            if (duration === 'SEMANAL') {
                sprint.end = new Date(new Date(sprint.begin).getTime() + ONE_WEEK);
            } else {
                //TODO:
            }
            sprint

            defered.resolve(sprint);
        })
        .catch(deferred.reject);

}