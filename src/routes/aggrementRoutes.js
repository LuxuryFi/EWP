const express = require("express");

const router = express.Router();
const aggrementController = require('../controllers/aggrementController');
const { isAuthenticated } = require('../middlewares/authentication');
const { validator, paramsValidator, paramsBodyValidator } = require('../middlewares/validator');
const {
  userPasswordSchema, userCreateSchema, userDeleteSchema, userUpdateSchema
} = require('../middlewares/schemas/accountSchemas');

// aggrement route

router.get('/service1/aggrement',isAuthenticated, aggrementController.getAggrement);

router.get('/service1/aggrement/:aggrement_id',isAuthenticated, aggrementController.getOneAggrement);

router.put('/service1/aggrement', isAuthenticated, aggrementController.updateAggrement);

router.post('/service1/aggrement', isAuthenticated, aggrementController.createAggrement);

router.delete('/service1/aggrement/:aggrement_id', isAuthenticated, aggrementController.deleteAggrement);

module.exports = router;
