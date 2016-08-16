var Q = require('q');

module.exports = function (app) {
    var service = {};

    service.query  = function (query) {
        var deferred = Q.defer();

        setTimeout(function () {
            //Verificar se não existe

            //Salvar

            deferred.fulfill([{id : 1}]);
        }, 2000);

        return deferred.promise;
    };

    service.create  = function (user) {
        var deferred = Q.defer();

        setTimeout(function () {
            //Verificar se não existe

            //Salvar

            deferred.fulfill("OK");
        }, 2000);

        return deferred.promise;
    };

    return service;
}();
