const express = require("express");

const router = express.Router();
const termController = require('../controllers/termController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');
const { isAuthorization } = require("../middlewares/authorization");

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');
const { ROLES } = require("../configs/ms-constants");

// Academic route

router.get('/service1/term', isAuthenticated, termController.getTerm);

router.get('/service1/term/:term_id', isAuthenticated, isAuthorization([ROLES.ADMIN]),termController.getOneTerm);

router.put('/service1/term', isAuthenticated, isAuthorization([ROLES.ADMIN]),termController.updateTerm);

router.post('/service1/term', isAuthenticated, isAuthorization([ROLES.ADMIN]),termController.createTerm);

router.delete('/service1/term/:term_id',isAuthenticated, isAuthorization([ROLES.ADMIN]),termController.deleteTerm);

module.exports = router;
