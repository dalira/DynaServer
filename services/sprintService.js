var Q = require('q');

var sprintDao = require('../daos/sprintDao');
var ConfigurationService = require('../services/configurationService');

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = ONE_DAY * 7;

var service = {};

service.query = function (query) {
    var deferred = Q.defer();

    var promise = sprintDao.query(query);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.create = function (sprint) {
    var deferred = Q.defer();

    ConfigurationService.get()
        .then(function (configuration) {

            var duration = configuration.duration;
            if (duration === 'SEMANAL') {
                sprint.end = new Date(new Date(sprint.begin).getTime() + ONE_WEEK);
            }else{
                //TODO:
            }

            sprintDao.create(sprint)
                .then(deferred.resolve)
                .catch(deferred.reject);

        })
        .catch(deferred.reject);


    return deferred.promise;
};

service.update = function (sprint) {
    var deferred = Q.defer();

    var promise = sprintDao.update(sprint);
    promise.then(deferred.resolve);
    promise.then(deferred.reject);

    return deferred.promise;
};


module.exports = service;