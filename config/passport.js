var passport = require('passport');
var passportJwt = require('passport-jwt');

var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;

var userService = require('../services/userService');

module.exports = function (app) {
    var secret = '5b178e6532fd012f29ff85a46b0bf0bd';
    app.set('secret', secret);

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        userService.findByLogin(jwt_payload.login)
            .then(function (user) {

                user = user.toObject();
                delete user['password'];

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch(function (err) {
                done(err, false);
            });
    }));
};