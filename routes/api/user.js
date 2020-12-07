const express = require('express');
const router = express.Router();
const userController = require('../../controllers').userController;

// Find(read) user
// router.get('/get/:username', userController.findUser);

// Update user email
router.post('/update/email/', userController.updateUserEmail);

// Update user password
router.post('/update/password/', userController.updateUserPassword);

// Delete user
router.post('/delete/', userController.deleteUser);

module.exports = router;