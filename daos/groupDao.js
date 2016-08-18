var Q = require('q');

var Group = require('../models/Group');
var EntityNotValidError = require('../models/errors/EntityNotValidError');

module.exports = function () {
    var service = {};

    service.query = function (query) {
        var deferred = Q.defer();

        var promise = Group.find(query).then();
        promise.then(deferred.resolve);
        promise.catch(deferred.reject);

        return deferred.promise;
    };

    service.create = function(group) {
        var deferred = Q.defer();

        var promise = Group.create(group).then();
        promise.then(deferred.resolve);
        promise.catch(function(err){
            if (err.name === 'ValidationError') {
                deerred.reject(new EntityNotValidError());
            }else if (err.name === 'MongoError') {
                if (err.code === 11000) {
                    //Erro de valor unico duplicado
                    deferred.reject(new EntityNotValidError());
                }
            }
            else{
                deferred.reject(err);
            }
        });

        return deferred.promise;
    };

    service.update = function(group) {
        var deferred = Q.defer();

        var promise = Group.findOneAndUpdate({_id : group._id}, group).then();
        promise.then(function(newGroup){
            deferred.resolve(newGroup);
        });
        promise.catch(function(err){
            deferred.reject(err);
        });

        return deferred.promise;
    };

    return service;
}();

