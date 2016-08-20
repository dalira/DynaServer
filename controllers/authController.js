var authService = require('../services/authService');

var controller = {};

controller.auth = function (req, res, next) {
    var login = req.body.login;
    var password = req.body.password;


};

controller.checkToken = function (req, res, next) {

};

module.exports = controller;