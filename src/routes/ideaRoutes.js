const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const ideaController = require('../controllers/ideaController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');


// Idea route

router.get('/service1/idea', ideaController.getIdea);

router.get('/service1/idea/:idea_id', ideaController.getOneIdea);

router.post('/service1/idea',isAuthenticated, uploadDocument.array('imgCollection', 6), ideaController.createIdea);

router.delete('/service1/idea/:idea_id', ideaController.deleteIdea);

router.put('/service1/idea/:idea_id', ideaController.updateIdea);

router.get('/service/idea/exports', ideaController.exportIdea);

// Comment route

router.post('/service1/comment', isAuthenticated, ideaController.createComment);

router.put('/service1/comment/:comment_id', ideaController.updateComment);

router.delete('/service1/comment/:comment_id', isAuthenticated, ideaController.deleteComment);

router.get('/service1/comment/:idea_id', isAuthenticated, ideaController.getOneComment);

router.get('/service1/comment', isAuthenticated, ideaController.getComment);


// Vote route

router.post('/service1/vote', isAuthenticated, ideaController.vote);

module.exports = router;
