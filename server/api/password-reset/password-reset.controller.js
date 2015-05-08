'use strict';

var _ = require('lodash'),
  models = require('../../models')(),
  config = require('../../config/environment'),
  helpers = require('../../components/helpers');

module.exports = {
  passwordReset: passwordReset,
  passwordResetVerification: passwordResetVerification
};

function passwordReset(req, res, next) {
  models.user.find({'email_address': req.body.email_address}, function (err, user) {
    if (err) {
      console.error(err);
      return res.send(500);
    }
    if (!user.length) {
      console.error('could not find account information');
      return res.send(500);
    }

    user = user[0];

    models.password_reset.find({user_id: user.id}, function(err, activePasswordReset) {
      if (err) {
        console.error(err);
        return res.send(500);
      }

      if (activePasswordReset.length) {
        activePasswordReset = activePasswordReset[0];
        activePasswordReset.save(function(err, passwordResetRecord) {
          sendPasswordResetEmail(passwordResetRecord.verification_id);
        });
      } else {
        models.password_reset.create({user_id: user.id}, function(err, newPasswordResetRecord) {
          if (err) {
            console.error(err);
            return res.send(500);
          }

          sendPasswordResetEmail(newPasswordResetRecord.verification_id);
        });
      }
    });

    function sendPasswordResetEmail(verificationId) {
      helpers.email.sendEmail(req.body.email_address, 'Account Recovery', 'password-reset', {
        verificationId: verificationId
      });

      return res.send(200);
    }
  });
}

function passwordResetVerification(req, res, next) {
  models.password_reset.find({verification_id: req.params.verificationId}, function(err, passwordVerification) {
    if (err || !passwordVerification.length) {
      console.error(err || 'No password verification record exists');
      return res.send(500);
    }

    passwordVerification = passwordVerification[0];

    models.user.get(passwordVerification.user_id, function(err, user) {
      if (err) {
        console.error(err);
        return res.send(500);
      }

      if (user.email_address !== req.body.email_address) {
        console.error('Invalid user attempting to reset password');
        return res.send(500);
      }

      user.changePassword(req.body.new_password);
      passwordVerification.remove(function(err) {
        if (err) {
          console.error(err);
          return res.sent(500);
        }
        return res.send(200);
      });
    });
  });
}

