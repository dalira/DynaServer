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
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                    // or you could create a new account
                }
            })
            .catch(function (err) {
                done(err, false);
            });
    }));
};