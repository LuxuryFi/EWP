const express = require("express");

const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

// department route
router.get('/service1/department',isAuthenticated, departmentController.getDepartment);

router.get('/service1/department/:department_id',isAuthenticated, departmentController.getOneDepartment);

router.put('/service1/department',isAuthenticated, departmentController.updateDepartment);

router.post('/service1/department',isAuthenticated, departmentController.createDepartment);

router.delete('/service1/department/:department_id',isAuthenticated, departmentController.deleteDepartment);


module.exports = router;
