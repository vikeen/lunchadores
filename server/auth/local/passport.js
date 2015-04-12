var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (userModel, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email_address',
      passwordField: 'password'
    },
    function(email, password, done) {
      userModel.find({
        email_address: email.toLowerCase()
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user.length) {
          return done(null, false, { message: 'This email is not registered.' });
        }

        if (!user[0].authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};
