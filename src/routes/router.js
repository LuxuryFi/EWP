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


router.post('/service1/login', accountController.login)

router.get('/service1/test', isAuthenticated, service1Controller.service1Test);

router.post('/service1/role', isAuthenticated, accountController.createRole);


// user routes
router.get('/service1/user', isAuthenticated, accountController.getUser);

router.get('/service1/user/:username', isAuthenticated, accountController.getOneUser);

router.put('/service1/user/:user_id', isAuthenticated, uploadAvatar.single('avatar'), accountController.updateUser);

router.put('/service1/user/password', isAuthenticated, validator(userPasswordSchema), accountController.updateUserPassword);

router.post('/service1/user',  isAuthenticated,uploadAvatar.single('avatar'), accountController.createUser);

router.delete('/service1/user/:user_id', isAuthenticated,accountController.deleteUser);

router.post('/service1/reset-password/:token', isAuthenticated,accountController.resetPassword);

router.post('/service1/forgot-password',isAuthenticated, accountController.forgotPassword);

// department route

router.get('/service1/department',isAuthenticated, departmentController.getDepartment);

router.get('/service1/department/:department_id',isAuthenticated, departmentController.getOneDepartment);

router.put('/service1/department',isAuthenticated, departmentController.updateDepartment);

router.post('/service1/department',isAuthenticated, departmentController.createDepartment);

router.delete('/service1/department/:department_id',isAuthenticated, departmentController.deleteDepartment);


// category route

router.get('/service1/category',isAuthenticated, categoryController.getCategory);

router.get('/service1/category/:category_id',isAuthenticated, categoryController.getOneCategory);

router.put('/service1/category', isAuthenticated, categoryController.updateCategory);

router.post('/service1/category', isAuthenticated, categoryController.createCategory);

router.delete('/service1/category/:category_id', isAuthenticated, categoryController.deleteCategory);

// Academic route

router.get('/service1/term', isAuthenticated, termController.getTerm);

router.get('/service1/term/:term_id', isAuthenticated, termController.getOneTerm);

router.put('/service1/term', isAuthenticated, termController.updateTerm);

router.post('/service1/term', isAuthenticated, termController.createTerm);

router.delete('/service1/term/:term_id',isAuthenticated, termController.deleteTerm);


// Idea route
router.get('/service1/idea', ideaController.getIdea);

router.get('/service1/idea/:idea_id', ideaController.getOneIdea);

router.post('/service1/idea', uploadDocument.array('imgCollection', 6), ideaController.createIdea);

router.delete('/service1/idea/:idea_id', ideaController.deleteIdea);

router.put('/service1/idea/:idea_id', ideaController.updateIdea);

router.get('/service/idea/exports', ideaController.exportIdea);

// router.put('/service1/idea')


router.post('/user-profile', uploadAvatar.single('profileImg'), service1Controller.service1Test)

router.post('/user-profile-multiple', uploadDocument.array('imgCollection', 6), service1Controller.service2Test)


// Comment route

router.post('/service1/comment', isAuthenticated, ideaController.createComment);

router.put('/service1/comment/:comment_id', ideaController.updateComment);

router.delete('/service1/comment/:comment_id', isAuthenticated, ideaController.deleteComment);

router.get('/service1/comment/:idea_id', isAuthenticated, ideaController.getOneComment);

router.get('/service1/comment', isAuthenticated, ideaController.getComment);


// Vote route

router.post('/service1/vote', isAuthenticated, ideaController.vote);

// aggrement route

router.get('/service1/aggrement',isAuthenticated, aggrementController.getAggrement);

router.get('/service1/aggrement/:aggrement_id',isAuthenticated, aggrementController.getOneAggrement);

router.put('/service1/aggrement', isAuthenticated, aggrementController.updateAggrement);

router.post('/service1/aggrement', isAuthenticated, aggrementController.createAggrement);

router.delete('/service1/aggrement/:aggrement_id', isAuthenticated, aggrementController.deleteAggrement);


router.get("/", (req, res, next) => {
  User.find().then(data => {
      res.status(200).json({
          message: "User list retrieved successfully!",
          users: data
      });
  });
});

module.exports = router;
