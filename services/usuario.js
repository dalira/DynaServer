var Q = require('q');
var usuarioDAO = require('../daos/usuario.js');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError.js');

module.exports = function (app) {
    var service = {};

    service.query = function (query) {
        var deferred = Q.defer();

        setTimeout(function () {
            //Verificar se não existe

            //Salvar

            deferred.fulfill([{id: 1}]);
        }, 2000);

        return deferred.promise;
    };

    service.save = function (user) {
        var deferred = Q.defer();

        setTimeout(function () {
            //Verificar se não existe

            usuarioDAO.exists({login: user.login})
                .then(checkIfUserAlreadyExists)
                .catch(function (error) {
                    deferred.reject(error);
                });

            deferred.fulfill("OK");
        }, 2000);

        return deferred.promise;
    };

    return service;
}();

function checkIfUserAlreadyExists(exists) {
    if (exists) {
        //Se ja existe um usuário com o login
        deferred.reject(new EntityAlreadyExistError("`Já existe um usuário com o login ${user.login}`"));
    } else {
        usuarioDAO.save(user)
            .then()
            .catch();
    }
}