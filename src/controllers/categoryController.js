const logger = require('../services/loggerService');
const { User, Role } = require('../models');
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

exports.getCategory = async (req, res) => {

}

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;

    const is_insert = await Role.create({
      role_name,
    });

    logger.info('Role created success', { is_insert });
    res.send(is_insert);
  } catch {

  }
}

exports.getOneCategory = async (req, res) => {

}

exports.updateCategory = async (req, res) => {

}



exports.deleteCategory = async (req, res) => {

}
