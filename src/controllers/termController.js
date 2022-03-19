const logger = require('../services/loggerService');
const { User, Role, Term } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const emailService = require('../services/emailService.js');
const { email } = require('../configs/config');
const { EMAIL_SLUGS } = require('../configs/emailSlugs');
const crypto = require('crypto');
const config = require('../configs/config');
const { ROLES } = require('../configs/ms-constants');

exports.getTerm = async (req, res) => {
  try {
    const result = await Term.findAll();
    if (result) {
      logger.info('Term list', {term: result});
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Cannot get term list', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createTerm = async (req, res) => {
  try {
    const data = req.body;

    const term = await Term.create(data);
    if (term) {
      logger.info('Term created success', { term });
      return response.respondOk(res, term);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Term create failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneTerm = async (req, res, next) => {
  try {
    const term_id = req.params.term_id;
    const term = await Term.findOne({
      where: {
        term_id,
      }
    });
    if (term) {
      logger.info('Term found', { term });
      return response.respondOk(res, term);
    };
    return next(marginInfo);
  } catch (err) {
    logger.error('Failed to get term', term_id);
    return response.respondInternalServerError(err, [customMessages.errors.internalError]);
  }
}

exports.updateTerm = async (req, res) => {
  try {
    const data = req.body;
    const term = await Term.findOne({
      where: {
        term_id: data.term_id
      },
    });
    logger.info('Term found', { term });

    if (term) {
      const updateTerm = await Term.update(data, {
        where: {
          term_id: data.term_id,
        }
      });

      logger.info('Term updated', { updateTerm });
      return response.respondOk(res, updateTerm);
    };
    return next(term);
  } catch (err) {
    logger.error('Failed to update term', err);
    return response.respondInternalServerError(err, [customMessages.errors.internalError]);
  }
}

exports.deleteTerm = async (req, res) => {
  try {
    const term_id = req.params.term_id;
    const result = await Term.destroy({ where: {
      term_id,
    } });

    if (result) {
      logger.info('Term deleted', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Term delete failed', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}
