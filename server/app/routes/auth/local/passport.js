var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (userModel, config) {
    passport.use(new LocalStrategy({
            usernameField: 'email_address',
            passwordField: 'password'
        },
        function (email, password, done) {
            userModel.find({
                where: {email_address: email.toLowerCase()}
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {message: 'This email is not registered.'});
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {message: 'This password is not correct.'});
                }
                return done(null, user);
            }).catch(function (err) {
                return done(err);
            });
        }
    ));
};
