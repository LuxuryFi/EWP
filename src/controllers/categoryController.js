const logger = require('../services/loggerService');
const { User, Role, Category } = require('../models');
const { Op } = require('sequelize');
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
const config = require('../configs/config');
const { ROLES } = require('../configs/ms-constants');

exports.getCategory = async (req, res) => {
  try {
    const result = await Category.findAll();
    if (result) {
      logger.info('Category list', {category: result});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Cannot get category list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    const checkUserExist = await User.findOne({
      where: {
        user_id: data.staff_id,
        role_id: ROLES.QA_COORDINATOR
      }
    });

    if (!checkUserExist) {
      logger.error('Staff is not existed', { user: checkUserExist});
      return response.respondInternalServerError(res, [customMessages.errors.userNotFound]);
    }

    const category = await Category.create(data);
    if (category) {
      logger.info('Category created success', { category });
      return response.respondOk(res, category);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneCategory = async (req, res, next) => {
  try {
    const category_id = req.params.category_id;
    const category = await Category.findOne({
      where: {
        category_id,
      }
    });
    if (category) {
      logger.info('Category found', { category });
      return response.respondOk(res, category);
    };
  } catch (err) {
    logger.error('Failed to get category', category_id);
    return response.respondInternalServerError(err, [customMessages.errors.internalError]);
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = await Category.findOne({
      where: {
        category_id: data.category_id
      },
    });

    if (category) {
      // console.log('Test')
      const staff = await User.findOne({
        where: {
          user_id: data.staff_id,
          role_id: ROLES.QA_COORDINATOR
        },
      });

      if (!staff) {
        logger.error('Staff is not existed', data.staff_id);
        return response.respondInternalServerError(res, [customMessages.errors.userNotFound]);
      }

      data.updated_date = new Date();
      const updateCategory = await Category.update(data, {
        where: {
          category_id: data.category_id,
        }
      });

      logger.info('Category found', { updateCategory });
      return response.respondOk(res, updateCategory);
    };
    return next(category);
  } catch (err) {
    logger.error('Failed to update category', category_id);
    return response.respondInternalServerError(err, [customMessages.errors.internalError]);
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const result = await Category.destroy({ where: {
      category_id,
    } });

    if (result) {
      logger.info('Category deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Category delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
