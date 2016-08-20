var Q = require('q');
var userDAO = require('../daos/userDao');

var service = {};

service.auth = function (login, password) {
    var deferred = Q.defer();

    var promise = userDAO.query(query);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

module.exports = service;