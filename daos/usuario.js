var Q = require('q');

const userBD = [];

module.exports = function (app) {
    var service = {};

    service.exists = function (query) {
        var deferred = Q.defer();

        setTimeout(function () {
            deferred.fulfill(userBD);
        }, 2000);

        return deferred.promise;
    };

    service.query = function (query) {
        var deferred = Q.defer();

        setTimeout(function () {
            deferred.fulfill(userBD);
        }, 2000);

        return deferred.promise;
    };

    service.save = function (user) {
        var deferred = Q.defer();

        setTimeout(function () {
            //Salvar
            userBD.push(user);

            deferred.fulfill(user);
        }, 2000);

        return deferred.promise;
    };

    return service;
}();
