const logger = require('../services/loggerService');
const { User, Role, Department, Department } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const crypto = require('crypto');
const { ROLES } = require('../configs/ms-constants');

exports.getDepartment = async (req, res) => {
  try {
    const result = await Department.findAll();
    if (result) {
      logger.info('Department list', {department: result});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Cannot get department list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createDepartment = async (req, res) => {
  try {
    const data = req.body;
    const checkUserExist = await User.findOne({
      where: {
        user_id: data.manager_id,
        role_id: ROLES.QA_COORDINATOR
      }
    });

    if (!checkUserExist) {
      logger.error('Manager is not existed', { user: checkUserExist});
      return response.respondInternalServerError(res, [customMessages.errors.userNotFound]);
    }

    const department = await Department.create(data);
    if (department) {
      logger.info('Department created success', { department });
      return response.respondOk(res, department);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch {
    logger.error('Categogy create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneDepartment = async (req, res, next) => {
  try {
    const department_id = req.params.department_id;
    const department = await Department.findOne({
      where: {
        department_id,
      }
    });
    if (department) {
      logger.info('Department found', { department });
      return response.respondOk(res, department);
    };
    return next(marginInfo);
  } catch (err) {
    logger.error('Failed to get department', department_id);
    return response.respondInternalServerError(err, [customMessages.errors.internalError]);
  }
}

exports.updateDepartment = async (req, res) => {
  try {
    // const department_id = req.params.department_id;
    const data = req.body;
    const department = await Department.findOne({
      where: {
        department_id: data.department_id,
      },
    });
    if (department) {
      const staff = await User.findOne({
        where: {
          user_id: data.staff_id,
          role: ROLES.QA_COORDINATOR
        },
      });

      if (!staff) {
        logger.error('Staff is not existed', data.staff_id);
        return response.respondInternalServerError(res, [customMessages.errors.userNotFound]);
      }
      logger.info('Department found', { department });
      return response.respondOk(res, department);
    };
    return next(marginInfo);
  } catch (err) {
    logger.error('Failed to update department', department_id);
    return response.respondInternalServerError(err, [customMessages.errors.internalError]);
  }
}

exports.deleteDepartment = async (req, res) => {
  try {
    const department_id = req.params.department_id;
    const result = await User.destroy({ where: {
      department_id,
    } });

    if (result) {
      logger.info('Department deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Department delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
