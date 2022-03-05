const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const { isAuthenticated } = require('../middlewares/authentication');

router.post('/service1/login',isAuthenticated, accountController.login)

router.get('/service1/test',isAuthenticated, service1Controller.service1Test);

router.post('/service1/role',isAuthenticated, accountController.createRole);

module.exports = router;
