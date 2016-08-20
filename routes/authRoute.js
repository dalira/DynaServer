const PATH = '';

var authController = require('../controllers/authController');

module.exports = function (app) {

    app.use('/*', authController.checkToken);
    app.post('/auth', authController.auth);

};