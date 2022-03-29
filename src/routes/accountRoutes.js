const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar } = require('../services/uploadFileService');


router.post('/service1/login', accountController.login)

router.get('/service1/test', service1Controller.service1Test);

router.post('/service1/role', isAuthenticated, accountController.createRole);

router.get('/service1/identity', isAuthenticated, accountController.getIdentity);

// user routes

router.get('/service1/user', isAuthenticated, accountController.getUser);

router.get('/service1/user/:username', isAuthenticated, accountController.getOneUser);

router.put('/service1/user/:user_id', isAuthenticated, uploadAvatar.single('avatar'), accountController.updateUser);

router.put('/service1/user/password', isAuthenticated, validator(userPasswordSchema), accountController.updateUserPassword);

router.post('/service1/user',  isAuthenticated,uploadAvatar.single('avatar'), accountController.createUser);

router.delete('/service1/user/:user_id', isAuthenticated,accountController.deleteUser);

router.post('/service1/reset-password/:token', isAuthenticated,accountController.resetPassword);

router.post('/service1/forgot-password',isAuthenticated, accountController.forgotPassword);

module.exports = router;
