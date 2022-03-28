const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const departmentController = require('../controllers/departmentController');
const categoryController = require('../controllers/categoryController');
const aggrementController = require('../controllers/aggrementController');
const termController = require('../controllers/termController');
const ideaController = require('../controllers/ideaController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');

// user routes

router.use(require('./accountRoutes'))
router.use(require('./departmentRoutes'))
router.use(require('./categoryRoutess'))
router.use(require('./academicRoutes'))
router.use(require('./ideaRoutes'))
router.use(require('./aggrementRoutes'))

module.exports = router;
