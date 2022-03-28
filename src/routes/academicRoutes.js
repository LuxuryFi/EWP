const express = require("express");

const router = express.Router();
const termController = require('../controllers/termController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');

// Academic route

router.get('/service1/term', isAuthenticated, termController.getTerm);

router.get('/service1/term/:term_id', isAuthenticated, termController.getOneTerm);

router.put('/service1/term', isAuthenticated, termController.updateTerm);

router.post('/service1/term', isAuthenticated, termController.createTerm);

router.delete('/service1/term/:term_id',isAuthenticated, termController.deleteTerm);

module.exports = router;
