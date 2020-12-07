const express = require('express');
const router = express.Router();
const userController = require('../../controllers').userController;

// Create user
router.post('/', userController.createUser);

// Find(read) user
router.get('/:username', userController.findUser);

// Update user email
router.post('/update/email/', userController.updateUserEmail);

// Update user password
router.post('/update/password/', userController.updateUserPassword);

// Delete user
router.post('/delete/', userController.deleteUser);

module.exports = router;