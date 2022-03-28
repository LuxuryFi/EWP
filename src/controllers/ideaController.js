const logger = require('../services/loggerService');
const { User, Role, Term, Idea, IdeaDocument, IdeaComment, IdeaVote, Department, Category } = require('../models');
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const response = require('../services/responseService');
const customMessages = require('../configs/customMessages');
const { generatePassword } = require('../services/generatePassword');
const emailService = require('../services/emailService.js');
const { email } = require('../configs/config');
const { EMAIL_SLUGS } = require('../configs/emailSlugs');
const config = require('../configs/config');
const fs = require('fs');
const path = require('path');
const { TERM_STATUS, ROLES } = require('../configs/ms-constants');
const { Parser } = require('json2csv');

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

      const department = await Department.findOne({
        where: {
          department_id: req.user.department_id,
        },
      })

      const manager = await User.findOne({
        where: {
          user_id: department.manager_id,
        }
      })

      const sendEmail = await emailService.sendEmail({
        email_slug: EMAIL_SLUGS.IDEA_CREATED,
        id: idea.idea_id,
        created_date: idea.created_date,
        department_id: idea.department_id,
        full_name: req.user.full_name,
        title: idea.title,
        description: idea.description,
        username: manager.username,
      })

      console.log(req.files.length);
      const reqFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const ext = path.extname(req.files[i].filename);
        reqFiles.push({ document: req.files[i].filename, idea_id: idea.idea_id, file_type: ext.substring(1)});
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

    const ideas = await Idea.findAll({
        where,
        include: [
          {
            model: Department, as: 'department', attributes: ['department_name']
          },
          {
            model: Category, as: 'category', attributes: ['category_name']
          },
          {
            model: Term, as: 'term', attributes: ['term_name']
          },
          {
            model: User, as: 'user', attributes: ['full_name']
          }
        ]
      },
    );
    const finalResult = [];

    ideas.forEach( idea => {
      finalResult.push({
        idea_id: idea.idea_id,
        department_name: idea.department.department_name,
        category_name: idea.category.category_name,
        term_name: idea.term.term_name,
        full_name: idea.user.full_name,
        title: idea.title,
        description: idea.description,
        status: idea.status,
        created_date: idea.created_date,
        updated_date: idea.updated_date,
      });
    })
    return response.respondOk(res, finalResult);
  } catch (err) {
    logger.error('Failed to get idea list', err)
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
  }
}

exports.exportIdea = async (req, res) => {
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

    const ideas = await Idea.findAll({
        where,
        include: [
          {
            model: Department, as: 'department', attributes: ['department_name']
          },
          {
            model: Category, as: 'category', attributes: ['category_name']
          },
          {
            model: Term, as: 'term', attributes: ['term_name']
          },
          {
            model: User, as: 'user', attributes: ['full_name']
          }
        ]
      },
    );
    const finalResult = [];

    ideas.forEach( idea => {
      finalResult.push({
        idea_id: idea.idea_id,
        department_name: idea.department.department_id,
        category_name: idea.category.category_name,
        term_name: idea.term.term_name,
        full_name: idea.user.full_name,
        title: idea.title,
        description: idea.description,
        status: idea.status,
        created_date: idea.created_date,
        updated_date: idea.updated_date,
      });
    })

    const opts = {
      fields: ['idea_id','title','full_name','description','status','department_name','category_name','created_date','updated_date'],
    }

    console.log(opts)
    const parser = new Parser(opts);
    const csv = parser.parse(finalResult);

    console.log(csv)
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
            model: IdeaComment, as:'comments', include: [{
              model: User, attributes: ['full_name', 'avatar']
            }],
          },
          {
            model: User, as: 'user', attributes: ['full_name','avatar']
          },
          {
            model: Category, as: 'category', attributes: ['category_name'],
          },
          {
            model: Department, as: 'department', attributes: ['department_name'],
          },
          {
            model: Term, as: 'term', attributes: ['term_name']
          },
        ]
      },
    );

    const finalResult = {
      idea_id: idea.idea_id,
      user_id: idea.user_id,
      full_name: idea.user.full_name,
      avatar: idea.user.avatar,
      title: idea.title,
      status: idea.status,
      description: idea.description,
      department_name: idea.department.department_name,
      term_name: idea.term.term_name,
      category_name: idea.category.category_name,
      category_id: idea.category_id,
      term_id: idea.term_id,
      department_id: idea.department_id,
      documents: idea.documents,
    }

    const comments = idea.comments.map( comment => {
      return {
        full_name: comment.user.full_name,
        avatar: comment.user.avatar,
        comment: comment.comment,
        created_date: comment.created_date,
        updated_date: comment.updated_date,
      }
    });

    const count = await IdeaVote.findAll({
      attributes: [
        'vote',
        [sequelize.fn('COUNT', sequelize.col('vote')), 'count']
      ],
      group: 'vote',
      raw: true,
      where: {
        idea_id: ideaId,
      }
    })

    finalResult.count = count;
    finalResult.comments = comments;

    if (finalResult) {
      logger.info('Idea found', { finalResult });
      return response.respondOk(res, finalResult);
    }
    return response.respondOk(res, finalResult);
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
    const userId = req.user.user_id;
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
        if (comment.anonymous && comment.user_id !== userId) {
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
    const userId = req.user.user_id;
    const userRole = req.user.role_id;

    const comment = await IdeaComment.findOne({
      where: {
        comment_id: commentId,
      },
    });

    if (comment.user_id === userId || userRole === ROLES.ADMIN) {
      const result = await IdeaComment.destroy({
        where: {
          comment_id: commentId,
        }
      });

      if (result) {
        logger.info('Comment deleted', { result });
        return response.respondOk(res, result);
      }
    }
    logger.error('Cannot delete comment');
    return response.respondInternalServerError(res, [customMessages.errors.internalError]);
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
