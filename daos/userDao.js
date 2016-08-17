var Q = require('q');

var User = require('../models/User');
var EntityNotValidError = require('../models/errors/EntityNotValidError');

module.exports = function (app) {
    var service = {};

    service.exists = function (query) {
        var deferred = Q.defer();

        var promise = User.findOne(query);
        promise.then(function (user) {
            deferred.resolve((!user));
        });
        promise.catch(promise.reject);

        return deferred.promise;
    };

    service.query = function (query) {
        var deferred = Q.defer();


        return deferred.promise;
    };

    service.create = function(user) {
        var deferred = Q.defer();

        var promise = User.create(user).then();
        promise.then(function(newUser){
            deferred.resolve(newUser);
        });
        promise.catch(function(err){
            if (err.name === 'ValidationError') {
                deferred.reject(new EntityNotValidError());
            }else{
                deferred.reject(err);
            }
        });

        return deferred.promise;
    };

    service.update = function(user) {
        var deferred = Q.defer();



        return deferred.promise;
    };

    return service;
}();

