'use strict';

var models = require('../models'),
    config = require('../../config/environment')(),
    helpers = require('../components/helpers');

module.exports = {
    passwordReset: passwordReset,
    passwordResetVerification: passwordResetVerification
};

function passwordReset(email) {
    return models.users.findOne({where: {email_address: email}}).then(function (user) {
        if (!user) {
            throw 'Could not find account information';
        }

        return models.password_resets.findOrCreate({where: {user_id: user.id}}).then(function (passwordResetRecord) {
            helpers.email.sendEmail(email, 'Account Recovery', 'password-reset', {
                verificationId: passwordResetRecord.verification_id
            });
        });
    });
}

function passwordResetVerification(verificationId, payload) {
    return models.password_resets.findOne({where: {verification_id: verificationId}}).then(function (passwordVerification) {
        if (!passwordVerification) {
            throw 'No password verification record exists';
        }

        return models.users.findById(passwordVerification.user_id).then(function (user) {
            if (user.email_address !== payload.email) {
                throw 'Invalid user attempting to reset password';
            }

            user.changePassword(payload.newPassword);

            return passwordVerification.destroy();
        });
    });
}

