var EntityNotValidError = require('../errors/EntityNotValidError');
var EntityAlreadyExistError = require('../errors/EntityAlreadyExistError');
var BadRequestError = require('../errors/BadRequestError');
var UnauthorizedUserError = require('../errors/UnauthorizedUserError');

function errorHandlre (err, req, res, next) {
    console.log(err);
    if (err instanceof UnauthorizedUserError) {
        res.sendStatus(401);
    } else if (err instanceof EntityNotValidError) {
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