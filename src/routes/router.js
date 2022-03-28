const express = require("express");

const router = express.Router();
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');

// user routes

router.use(require('./accountRoutes'));
router.use(require('./departmentRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./academicRoutes'));
router.use(require('./ideaRoutes'));
router.use(require('./aggrementRoutes'));

module.exports = router;
