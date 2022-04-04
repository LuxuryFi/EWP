const express = require("express");

const router = express.Router();

// user routes

router.use(require('./accountRoutes'));
router.use(require('./departmentRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./academicRoutes'));
router.use(require('./ideaRoutes'));
router.use(require('./aggrementRoutes'));
router.use(require('./authRoutes'));


module.exports = router;
