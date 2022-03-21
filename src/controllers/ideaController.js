const logger = require('../services/loggerService');
const { User, Role, Term, Idea, ideaDocument } = require('../models');
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
const fs = require('fs');
const path = require('path');
const e = require('cors');
const { TERM_STATUS } = require('../configs/ms-constants');

exports.createIdea = async (req, res) => {
  try {   
		const data = req.body;
    const payload = {
      user_id: req.user.user_id,
      department_id: req.user.department_id,
      category_id: data.category_id,
      description: data.description,
      status: data.status,
      title: data.title
    }

    const term = await Term.findOne({
      where: {
        status: TERM_STATUS.ONGOING
      }
    });
    
    if (term) {
      payload.term_id = term.term_id;
    } else {
      logger.error('Cannot find any term on this time')
      return response.respondInternalServerError(res, [customMessages.errors.notAnyActiveTerm]);
    }

    const idea = await Idea.create(payload);
    if (idea) {    
      logger.info('Idead added successfully', { idea });
      const reqFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        reqFiles.push({ document: req.files[i].filename, idea_id: idea.idea_id});
      }
      const documents = await ideaDocument.bulkCreate(reqFiles);
      logger.info('Documents added successfully', { documents });
    }
  } catch (err) {
    logger.error('Failed to add idea', err);
    return response.respondInternalServerError(res, [err]);
  }
}

exports.getIdea = async (req, res) => {
  try {

  } catch (err) {

  }
}

exports.getOneIdea = async (req, res) => {
  try {
    
  } catch (err) {

  }
}