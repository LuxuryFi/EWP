const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const departmentController = require('../controllers/departmentController');
const categoryController = require('../controllers/categoryController');
const termController = require('../controllers/termController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

const { uploadAvatar, uploadDocument } = require('../services/uploadFileService');


router.post('/service1/login', accountController.login)

router.get('/service1/test',isAuthenticated, service1Controller.service1Test);

router.post('/service1/role',isAuthenticated, accountController.createRole);


// user routes
router.get('/service1/user', accountController.getUser);

router.get('/service1/user/:username', accountController.getOneUser);

router.put('/service1/user/:user_id', uploadAvatar.single('avatar'), accountController.updateUser);

router.put('/service1/user/password', validator(userPasswordSchema), accountController.updateUserPassword);

router.post('/service1/user',  uploadAvatar.single('avatar'), accountController.createUser);

router.delete('/service1/user/:user_id', accountController.deleteUser);

router.post('/service1/reset-password/:token', accountController.resetPassword);

router.post('/service1/forgot-password', accountController.forgotPassword);

// department route

router.get('/service1/department', departmentController.getDepartment);

router.get('/service1/department/:department_id', departmentController.getOneDepartment);

router.put('/service1/department', departmentController.updateDepartment);

router.post('/service1/department', departmentController.createDepartment);

router.delete('/service1/department/:department_id', departmentController.deleteDepartment);


// category route

router.get('/service1/category', categoryController.getCategory);

router.get('/service1/category/:category_id', categoryController.getOneCategory);

router.put('/service1/category', categoryController.updateCategory);

router.post('/service1/category', categoryController.createCategory);

router.delete('/service1/category/:category_id', categoryController.deleteCategory);

// Academic route

router.get('/service1/term', termController.getTerm);

router.get('/service1/term/:term_id', termController.getOneTerm);

router.put('/service1/term', termController.updateTerm);

router.post('/service1/term', termController.createTerm);

router.delete('/service1/term/:term_id', termController.deleteTerm);


router.post('/user-profile', uploadAvatar.single('profileImg'), service1Controller.service1Test)

router.post('/user-profile-multiple', uploadDocument.array('imgCollection', 6), service1Controller.service2Test)



router.get("/", (req, res, next) => {
  User.find().then(data => {
      res.status(200).json({
          message: "User list retrieved successfully!",
          users: data
      });
  });
});

module.exports = router;
