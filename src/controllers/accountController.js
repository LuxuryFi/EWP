const logger = require('../services/loggerService');
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const { generateHashPassword } = require('../services/generateBcrypt');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const emailService = require('../services/emailService.js');
const { email } = require('../configs/config');
const { EMAIL_SLUGS } = require('../configs/emailSlugs');
const crypto = require('crypto');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userInDB = await User.findOne({
      where: {
        username,
      },
    });

    logger.info('User found', { userInDB });
    if (userInDB) {
      const passwordHash = userInDB.password;
      const userData = {
        user_id: userInDB.user_id,
        username: userInDB.username,
        full_name: userInDB.full_name,
        avatar: userInDB.avatar
      }
      const getTimeNow = new Date();
      logger.info('User data', { userData });
      if (bcrypt.compareSync(password,passwordHash)) {
        console.log(true);
        const token = jwt.sign(userData ,'test', {
          expiresIn: getTimeNow.getSeconds() + 60000
        })

        const refreshToken = jwt.sign(userData ,'test', {
          expiresIn: getTimeNow.getSeconds() + 600000
        })
        const updateToken = await User.update({
          refreshToken
        }, {
          where: {
            username
          }
        });
        res.send({token, refreshToken});
      }
    }
  } catch (err) {
    logger.error('Login failed', {err});
    res.send(err);
  }
};

exports.createRole = async (req ,res) => {
  const { role_name } = req.body;

  const is_insert = await Role.create({
    role_name,
  });

  logger.info('Role created success', { is_insert });
  res.send(is_insert)
};

exports.getUser = async (req, res) => {
  try {
    const result = await User.findAll();
    if (result) {
      logger.info('Account list', {user: result});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Cannot get account list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneUser = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await User.findOne({
      where: {
        username
      },
    });
    if (result) {
      logger.info('Account created', {user: result});
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.internalError]);
  } catch (err) {
    logger.error('Account create failed', err);
    return response.respondInternalServerError(res, [customMessages.internalError]);
  }
}

exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = await generateHashPassword(data.password);
    const payload = {
      username: data.username,
      full_name: data.full_name,
      last_name:  data.last_name,
      first_name: data.first_name,
      phone: data.phone,
      role_id: data.role_id,
      password: hashedPassword,
      avatar: data.avatar
    }

    logger.debug('Payload for create', { payload });
    const result = await User.create(data);
    if (result) {
      const sendEmail = await emailService.sendEmail({
        password: data.password,
        username: data.username,
        email_slug: EMAIL_SLUGS.ACCOUNT_CREATED,
      });

      logger.info('Account created', {user: result});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Account create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateUser = async (req, res) => {
  try {
    const data = req.body;
    const updateData = {
      full_name: data.full_name,
      last_name: data.last_name,
      first_name: data.first_name,
      phone: data.phone,
      role_id: data.role_id,
      avatar: data.avatar
    }

    const updateCondition = {
      username: data.username,
    }

    const result = await User.update(updateData, {
      where: {
        username: data.username
      }
    });
    if (result) {
      logger.info('Account updated', {user: data});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Account update failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateUserPassword = async (req, res) => {
  try {
    const data = req.body;
    const hashedPassword = await generateHashPassword(data.password);

    const updateData = {
      password: hashedPassword,
    }

    const result = await User.update(updateData, {
      where: {
        username: data.username
      }
    });
    if (result) {
      logger.info('Account password updated', {user: data});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Account update failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.destroy({ where: data });

    if (isDeleted) {
      logger.info('User deleted', { isDeleted });
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Account delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const username = req.params.username;

    const newPassword = await generatePassword();

    const hashedPassword = await generateHashPassword(newPassword);

    const user = await User.update({
      password: hashedPassword,
    }, {
      where: {
        username,
      }
    })

  } catch (err) {

  }
}

exports.forgotPassword = async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({
        where: {
          username,
        }
      });
      logger.info('User found', {user});
      if (user) {
        const buffer = crypto.randomBytes(48);
        user.reset_password_token = buffer.toString('hex');
        user.reset_token_expires = Date.now() + config.general.resetTokenExpiration * 60 * 1000;
        
        const savedUser = await user.save();
        logger.info('User reset token created and saved.', { username: savedUser.username, reset_password_token: savedUser.reset_password_token, expires: savedUser.reset_token_expires });
        const sendEmail = await emailService.sendEmail({
          username: savedUser.username,
          reset_password_token: savedUser.reset_password_token,
          email_slug: EMAIL_SLUGS.PASSWORD_RESET,
        });
        return response.respondOk(res, {savedUser});
      }

    } catch (err) {
      logger.info('User reset password failed.', err);
      return response.respondInternalServerError(res, [customMessages.errors.internalError]);
    }
}