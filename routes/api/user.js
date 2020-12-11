const express = require('express');
const router = express.Router();
const userController = require('../../controllers').userController;
const checkAccessToken = require('../../middleware').checkAccessToken;

// All below routes must be authorized(Needs to have access key)
router.use(checkAccessToken);

// Update user email
router.post('/update-email/', userController.updateEmail);

// Update user password
router.post('/update-password/', userController.updatePassword);

// Delete user
router.delete('/delete-user/', userController.deleteUser);

module.exports = router;