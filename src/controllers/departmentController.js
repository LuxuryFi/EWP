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

exports.getDepartment = async (req, res) => {

}

exports.getOneDepartment = async (req, res) => {

}

exports.updateDepartment = async (req, res) => {

}

exports.createDepartment = async (req, res) => {

}

exports.deleteDepartment = async (req, res) => {

}
