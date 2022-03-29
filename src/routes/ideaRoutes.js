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

router.get('/service1/idea',isAuthenticated, ideaController.getIdea);

router.get('/service1/idea/:idea_id',isAuthenticated, ideaController.getOneIdea);

router.post('/service1/idea',isAuthenticated, uploadDocument.array('documents', 6), ideaController.createIdea);

router.delete('/service1/idea/:idea_id',isAuthenticated, ideaController.deleteIdea);

router.put('/service1/idea/:idea_id',isAuthenticated, ideaController.updateIdea);

router.get('/service/idea/exports',isAuthenticated, ideaController.exportIdea);

// Comment route

router.post('/service1/comment', isAuthenticated, ideaController.createComment);

router.put('/service1/comment/:comment_id', ideaController.updateComment);

router.delete('/service1/comment/:comment_id', isAuthenticated, ideaController.deleteComment);

router.get('/service1/comment/:idea_id', isAuthenticated, ideaController.getOneComment);

router.get('/service1/comment', isAuthenticated, ideaController.getComment);


// Vote route

router.post('/service1/vote', isAuthenticated, ideaController.vote);

// Export and download

router.get('/service1/csv', ideaController.exportIdea);

// Statistic

router.get('/service1/view', isAuthenticated,ideaController.getTop10View);


module.exports = router;
