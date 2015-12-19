"use strict";

var postmark = require('postmark'),
    _ = require('lodash'),
    config = require('../../../config/environment')();

module.exports = {
    sendEmail: sendEmail
};

/***************************
 * Public API
 ***************************/

/*
 * Send an email from the system
 *
 * @param to {string} - email destination
 * @param subject {string} - subject of the email
 * @param templateName {string} - email template name
 * @param templateData {object} - data to inject into placeholders
 *
 * @return {undefined}
 */
function sendEmail(to, subject, templateName, templateData) {
    var client = new postmark.Client(config.postmark.clientId);

    templateData = templateData || {};

    client.sendEmail({
        'From': config.robotEmail,
        'To': to,
        'Subject': subject,
        'HtmlBody': compileTemplate(templateName, templateData)
    });
}

/***************************
 * Private API
 ***************************/

/*
 * Compile an email template
 *
 * @return {string}
 */
function compileTemplate(name, data) {
    var string = '<p>*** This is an automatically generated email, please do not reply ***</p><p></p>';

    data.applicationUrl = config.applicationUrl;

    switch (name) {
        case 'password-reset':
            string += '<p>A request has been made to reset your Lunchadores account password.</p>' +
                '<p>Follow this link to continue: <a target="_top" href="<%= applicationUrl %>/password-reset/<%= verificationId %>"><%= applicationUrl %>/password-reset/<%= verificationId %></a></p>';
            break;
        default:
            throw 'Invalid email template';
    }

    return _.template(string)(data);
}
