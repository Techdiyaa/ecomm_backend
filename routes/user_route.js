const express = require('express');
const { registerUser, loginUser, changePassword, editProfile } = require('../controller/user_controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-password', authMiddleware, changePassword);
router.put('/edit-profile', authMiddleware, editProfile);

module.exports = router;
