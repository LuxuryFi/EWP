const express = require("express");

const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

// category route

router.use(require('./categoryRoutess'))

router.get('/service1/category',isAuthenticated, categoryController.getCategory);

router.get('/service1/category/:category_id',isAuthenticated, categoryController.getOneCategory);

router.put('/service1/category', isAuthenticated, categoryController.updateCategory);

router.post('/service1/category', isAuthenticated, categoryController.createCategory);

router.delete('/service1/category/:category_id', isAuthenticated, categoryController.deleteCategory);

module.exports = router;
