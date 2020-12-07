const express = require('express');
const router = express.Router();
const userController = require('../../controllers').userController;

// Signup
router.post('/signup/', userController.createUser);

// Login
router.post('/login/', );

// Logout
// router.get('/logout/');

module.exports = router;