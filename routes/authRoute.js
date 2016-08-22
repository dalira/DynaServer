var passport = require('passport');

module.exports = function (app) {

    var authController = require('../controllers/authController')(app);

    app.put('/auth', authController.auth);
    app.use('/*', passport.authenticate('jwt', { session: false}));

};