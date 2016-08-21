/**
 *
 * @param message
 * @constructor
 */
function UnauthorizedUserError(message) {
    this.name = 'UnauthorizedUserError';
    this.message = message;
}
UnauthorizedUserError.prototype = Error.prototype;

module.exports = UnauthorizedUserError;
