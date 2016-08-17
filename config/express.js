var express = require('express');
var EntityNotValidError = require('../models/errors/EntityNotValidError');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');

module.exports = function () {
    var app = express();

    app.set('port', process.env.PORT | 3000);

    app.use(express.static('/public'));
    app.use(require('body-parser').json());

    require('../routes/userRoute')(app);

    app.use(function(err, req, res, next) {
        if (err instanceof EntityNotValidError) {
            res.send(400);
        }else if (err instanceof EntityAlreadyExistError) {
            res.send(409);
        }else{
            res.send(500);
        }
    });

    return app;
};

