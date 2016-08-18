/**
 *
 * @param message
 * @constructor
 */
function BadRequestError(message) {
    this.name = 'BadRequestError';
    this.message = message;
}
BadRequestError.prototype = Error.prototype;

module.exports = BadRequestError;
