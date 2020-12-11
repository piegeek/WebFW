const express = require('express');
const { authController } = require('../../controllers');
const router = express.Router();
const userController = require('../../controllers').authController;

// Signup
router.post('/signup/', authController.signup);

// Login
router.post('/login/', authController.login);

// Refresh Token
router.post('/refresh-token/', authController.refreshToken);

// Verify User
router.get('/verify-user/:verificationCode', authController.verifyUser);

// Logout --> Delete access token on the client & delete refresh token on the database 
router.delete('/logout/', authController.logout);

module.exports = router;