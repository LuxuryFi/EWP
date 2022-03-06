const logger = require('../services/loggerService');
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('../app');
const { generateHashPassword } = require('../services/generateBcrypt');

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

      console.log("passwordHash", passwordHash  );
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
        // res.set('Authorization', token);
        // res.cookie('jwt',token, { httpOnly: true, secure: false, maxAge: 3600000 })

        const updateToken = await User.update({
          refreshToken
        }, {
          where: {
            username
          }
        });

        console.log(updateToken)

        res.send({token, refreshToken});
      }

      console.log('Test')
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
    logger.error('Account create failed', {err});
  }
}


exports.createUser = async (req, res) => {
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
    logger.error('Account create failed', {err});
  }
}

exports.updateUser = async (req, res) => {
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
    logger.error('Account create failed', {err});
  }
}

exports.deleteUser = async (req, res) => {
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
    logger.error('Account create failed', {err});
  }
}
