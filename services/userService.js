var Q = require('q');
var userDAO = require('../daos/userDao');

var service = {};

service.verifyPassword = function (login, password) {
    var deferred = Q.defer();

    service.query({login : login})
        .then(function (users) {

            var user = users[0];
            if (user) {
                user.verifyPassword(password, function (err, valid) {
                    if (err) {
                        deferred.reject(err);
                    }else{
                        deferred.resolve(valid);
                    }
                });
            }else{
                deferred.resolve(false);
            }
        })
        .catch(deferred.reject);

    return deferred.promise;
};

service.findByLogin = function (login) {
    var deferred = Q.defer();

    service.query()
        .then(function (users) {
            deferred.resolve(users[0]);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

service.query = function (query) {
    var deferred = Q.defer();

    var promise = userDAO.query(query);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.create = function (user) {
    var deferred = Q.defer();

    var promise = userDAO.create(user);
    promise.then(deferred.resolve);
    promise.catch(deferred.reject);

    return deferred.promise;
};

service.update = function (user) {
    var deferred = Q.defer();

    var promise = userDAO.update(user);
    promise.then(deferred.resolve);
    promise.then(deferred.reject);

    return deferred.promise;
};

module.exports = service;