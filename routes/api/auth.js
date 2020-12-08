const express = require('express');
const { authController } = require('../../controllers');
const router = express.Router();
const userController = require('../../controllers').authController;

// Signup
router.post('/signup/', authController.signup);

// Login
router.post('/login/', authController.login);

// Logout --> Implemented in the client

module.exports = router;