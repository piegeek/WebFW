const express = require('express');
const router = express.Router();
const userController = require('../../controllers').userController;

// Create user
router.post('/', userController.create);

// Read users
// TODO

// Update user
// TODO

// Delete user
// TODO

module.exports = router;