const logger = require('../services/loggerService');
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const { generateHashPassword } = require('../services/generateBcrypt');
const customMessages = require('../configs/customMessages');

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
    const data = req.body;
    const hashedPassword = await generateHashPassword(data.password);
    console.log(hashedPassword)

    data.password = hashedPassword;
    const user = await User.create(data);
    if (user) {
      logger.info('Account created', {user: data});
      res.send(user);
    }
    res.send(false);
  } catch (err) {
    logger.error('Account create failed', err);
  }
}

exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = await generateHashPassword(data.password);
    console.log(hashedPassword)

    data.password = hashedPassword;
    const result = await User.create(data);
    if (result) {
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
    res.send(err)
  }
}
