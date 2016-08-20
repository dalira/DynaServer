var EntityNotValidError = require('../models/errors/EntityNotValidError');
var EntityAlreadyExistError = require('../models/errors/EntityAlreadyExistError');
var BadRequestError = require('../models/errors/BadRequestError');

function errorHandlre (err, req, res, next) {
    console.log(err);
    if (err instanceof EntityNotValidError) {
        res.sendStatus(400);
    } else if (err instanceof EntityAlreadyExistError) {
        res.sendStatus(409);
    } else if (err instanceof BadRequestError) {
        res.sendStatus(400);
    } else {
        res.sendStatus(500);
    }
}

module.exports = errorHandlre;