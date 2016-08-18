/**
 *
 * @param message
 * @constructor
 */
function EntityAlreadyExistError(message) {
    this.name = 'EntityAlreadyExistError';
    this.message = message;
}
EntityAlreadyExistError.prototype = Error.prototype;

module.exports = EntityAlreadyExistError;
