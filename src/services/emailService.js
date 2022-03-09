const nodemailer = require('nodemailer');
const config = require('../configs/config');
const { accountCreatedTemplate, resetPasswordTemplate } = require('../utils/emailTemplate');
const emailSlugConstants = require('../configs/emailSlugs');
const logger = require('./loggerService');

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

exports.sendEmail = async (data) => {
  try {
    let email;
    if (data.email_slug === emailSlugConstants.EMAIL_SLUGS.ACCOUNT_CREATED) {
      const mailOption = {
        from: config.email.user,
        to: data.username,
        subject: 'Account created successful',
        text: 'Welcome',
        html: accountCreatedTemplate('Account created', data.username, data.password),
      }

      email = transporter.sendMail(mailOption, function(error, info){
        if (error) {
          logger.error('Email send failed', error);
        } else {
         logger.info('Email sent: ' + info.response);
        }
      });
    } else if (data.email_slug === emailSlugConstants.EMAIL_SLUGS.PASSWORD_RESET) {
      const mailOption = {
        from: config.email.user,
        to: data.username,
        subject: 'Your Account password reset link',
        text: 'Welcome',
        html: resetPasswordTemplate('Your Account password reset lin', data.username, data.reset_password_token),
      }
    }
  } catch (err) {
    logger.error('Email send failed', error);
  }
}
