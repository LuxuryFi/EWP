const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

router.post('/service1/login', accountController.login)

router.get('/service1/test',isAuthenticated, service1Controller.service1Test);

router.post('/service1/role',isAuthenticated, accountController.createRole);


// user routes
router.get('/service1/user', accountController.getUser);

router.get('/service1/user/:username', accountController.getOneUser);

router.put('/service1/user', validator(userUpdateSchema), accountController.updateUser);

router.put('/service1/user/password', validator(userPasswordSchema), accountController.updateUserPassword);

router.post('/service1/user', validator(userCreateSchema), accountController.createUser);

router.delete('/service1/user', validator(userDeleteSchema), accountController.deleteUser);

router.post('/service1/reset-password/:token', accountController.resetPassword);

router.post('/service1/forgot-password', accountController.forgotPassword);

// category route





module.exports = router;
