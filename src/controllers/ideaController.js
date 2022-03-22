const logger = require('../services/loggerService');
const { User, Role, Term, Idea, IdeaDocument, IdeaComment, IdeaVote, Department } = require('../models');
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const emailService = require('../services/emailService.js');
const { email } = require('../configs/config');
const { EMAIL_SLUGS } = require('../configs/emailSlugs');
const config = require('../configs/config');
const fs = require('fs');
const path = require('path');
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
      const documents = await IdeaDocument.bulkCreate(reqFiles);
      logger.info('Documents added successfully', { documents });
      return response.respondOk(res, idea);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Failed to add idea', err);
    return response.respondInternalServerError(res, [err]);
  }
}

exports.getIdea = async (req, res) => {
  try {
    const where = {};
    const pageNumber = req.query.page;

    if (req.query.department_id) {
      where.department_id = req.query.department_id;
    }

    if (req.query.user_id) {
      where.user_id = req.query.user_id;
    }

    if (req.query.term_id) {
      where.term_id = req.query.term_id;
    }

    if (req.query.idea_id) {
      where.idea_id = req.query.idea_id;
    }

    const idea = await Idea.findAll({
        where, 
        include: [
          {
            model: Department, as: 'department'
          }
        ]
      },
    );
    return response.respondOk(res, idea);
  } catch (err) {
    logger.error('Failed to get idea list', err)
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneIdea = async (req, res) => {
  try {
    const ideaId = req.params.idea_id;
    const idea = await Idea.findOne({
        where: {
          idea_id: ideaId,
        },  
        include: [{
          model: IdeaDocument, as: 'documents',
          },
          {
            model: IdeaComment, as: 'comments',
          },
          {
            model: IdeaVote, as: 'votes'
          }
        ]
      },
    );
    if (idea) {
      logger.info('Idea found', { idea });
      return response.respondOk(res, idea);
    }
    return response.respondOk(res, idea);
  } catch (err) {
    logger.error('Failed to idea', err)
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateIdea = async (req, res) => {
  try {
    const ideaId = req.params.idea_id;
    const data = req.body;

    const updatePayload = {
      description: data.description,
      title: data.title,
      category_id: data.category_id,
      status: data.status,
    }

    const updatedIdea = await Idea.update(updatePayload, {
      where: {
        idea_id: ideaId,
      }
    });

    if (updatedIdea) {
      logger.info('Idea updated success', updatedIdea);
      return response.respondOk(res, updatedIdea);
    }
  } catch (err) {
    logger.info('Failed to update idea', err);
    return response.respondOk(res, updatedIdea);
  }
};

exports.deleteIdea = async (req, res) => {
  try {
    const ideaId = req.params.idea_id;
    const result = await Idea.destroy({ where: {
      idea_id: ideaId,
    } });

    if (result) {
      logger.info('Idea deleted success', { result });
      return response.respondOk(res, result);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Failed to delete idea', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.createComment = async (req, res) => {
  try {
    const data = req.body;

    const payload = {
      user_id: req.user.user_id,
      comment: data.comment,
      idea_id: data.idea_id,
    }
    if (data.anonymous) payload.anonymous = data.anonymous;

    const comment = await IdeaComment.create(payload);
    
    if (comment) {
      logger.info('Commented', { comment });
      return response.respondOk(res, comment);
    }
  } catch (err) {
    logger.info('Failed to comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getOneComment = async (req, res) => {
  try {
    const ideaId = req.params.idea_id;
    const comments = await IdeaComment.findAll({
      where: {
        idea_id: ideaId,
      },
      include: [
        {
          model: User, attributes: ['full_name', 'avatar', 'gender']
        }
      ]
    });

    if (comments) {
      comments.forEach( comment => {
        if (comment.anonymous) {
          comment.user.full_name = 'anonymous';
          if (comment.gender === 'female') {
            comment.user.avatar = 'img/female.jpg'
          } else {
            comment.user.avatar = 'img/male.jpg'
          }
        }
      })
      logger.info('Comment found', { comments });
      return response.respondOk(res, comments);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.info('Failed to get comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.getComment = async (req, res) => {
  try {
    const ideaId = req.params.idea_id;
    const comment = await IdeaComment.findAll({});

    if (comment) {
      logger.info('Comment found', { comment });
      return response.respondOk(res, comment);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.info('Failed to get comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const data = req.body;

    const updatePayload = {
      comment: data.comment,
      updated_date: new Date(),
    }

    if (data.anonymous) payload.anonymous = data.anonymous;
    const comment = await IdeaComment.update(updatePayload, {
      where: {
        comment_id: commentId,
      },
    });
    
    if (comment) {
      logger.info('Comment updated', { comment });
      return response.respondOk(res, comment);
    }
  } catch (err) {
    logger.info('Failed to updated comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.comment_id;
    const result = await IdeaComment.destroy({
      where: {
        comment_id: commentId,
      }
    });

    if (result) {
      logger.info('Comment deleted', { result });
      return response.respondOk(res, result);
    }
  } catch (err) {
    logger.error('Faled to delete comment', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.vote = async (req, res) => {
  try {
    const data = req.body;
    const payload = {
      user_id: req.user.user_id,
      vote: data.vote,
      idea_id: data.idea_id,
    }
    const checkVoteExisted = await IdeaVote.findOne({
      where: {
        user_id: payload.user_id,
        idea_id: payload.idea_id,
      },
      raw: true,
    });

    console.log(checkVoteExisted)

    if (checkVoteExisted) {
      if (checkVoteExisted.vote === payload.vote) {
        const result = await IdeaVote.destroy({
          where: {
            vote_id: checkVoteExisted.vote_id,
          }
        })
      if (result) {
        logger.info('Unvoted', result);
        return response.respondOk(res, result);
      }
    }
      const updatedVote = await IdeaVote.update({
        vote: payload.vote,
        updated_date: new Date(),
      }, {
        where: {
          vote_id: checkVoteExisted.vote_id,
        },
      })

      if (updatedVote) {
        logger.info('Voted', { updatedVote });
        return response.respondOk(res, updatedVote);
      }
    }

    const vote = await IdeaVote.create(payload);
    if (vote) {
      logger.info('Voted', { vote });
      return response.respondOk(res, vote);
    }
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  } catch (err) {
    logger.error('Failed to vote', err);
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

