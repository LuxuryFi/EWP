const nodemailer = require('nodemailer');
const config = require('../configs/config');
const { accountCreatedTemplate } = require('../utils/emailTemplate');
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

      console.log(config.email.user);
      console.log(config.email.password);

      email = transporter.sendMail(mailOption, function(error, info){
        if (error) {
          logger.error('Email send failed', error);
        } else {
         logger.info('Email sent: ' + info.response);
        }
      });
    }
  } catch (err) {
    logger.error('Email send failed', error);
  }
}
