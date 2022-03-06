const express = require("express");

const router = express.Router();
const service1Controller = require('../controllers/service1');
const accountController = require('../controllers/accountController');
const { isAuthenticated } = require('../middlewares/authentication');

router.post('/service1/login', accountController.login)

router.get('/service1/test',isAuthenticated, service1Controller.service1Test);

router.post('/service1/role',isAuthenticated, accountController.createRole);


// user routes
router.get('/service1/user', accountController.getUser);

// router.get('/service1/user', accountController.getUser);

router.post('/service1/user', accountController.updateUser);

router.post('/service1/user', accountController.createUser);

router.post('/service1/user', accountController.deleteUser);



module.exports = router;
