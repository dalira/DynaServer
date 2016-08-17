/**
 *
 * @param message
 * @constructor
 */
function EntityAlreadyExistError(message) {
    this.name = 'EntityAlreadyExistError';
    this.message = message;
    this.stack = (new Error()).stack;
}
EntityAlreadyExistError.prototype = new Error;

module.exports = EntityAlreadyExistError;
