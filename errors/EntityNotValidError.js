/**
 *
 * @param message
 * @constructor
 */
function EntityNotValidError(message) {
    this.name = 'EntityNotValidError';
    this.message = message;
}
EntityNotValidError.prototype = Error.prototype;

module.exports = EntityNotValidError;
