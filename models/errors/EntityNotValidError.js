/**
 *
 * @param message
 * @constructor
 */
function EntityNotValidError(message) {
    this.name = 'EntityNotValidError';
    this.message = message;
    this.stack = (new Error()).stack;
}
EntityNotValidError.prototype = new Error;

module.exports = EntityNotValidError;
