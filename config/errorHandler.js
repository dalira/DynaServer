var EntityNotValidError = require('../errors/EntityNotValidError');
var EntityAlreadyExistError = require('../errors/EntityAlreadyExistError');
var BadRequestError = require('../errors/BadRequestError');
var UnauthorizedUserError = require('../errors/UnauthorizedUserError');

function errorHandlre (err, req, res, next) {
    console.log(err);
    console.log(err.stack);
    if (err.name === UnauthorizedUserError.name) {
        res.sendStatus(401);
    } else if (err.name === EntityNotValidError.name) {
        res.sendStatus(400);
    } else if (err.name === EntityAlreadyExistError.name) {
        res.sendStatus(409);
    } else if (err.name === BadRequestError.name) {
        res.sendStatus(400);
    } else {
        res.sendStatus(500);
    }
}

module.exports = errorHandlre;