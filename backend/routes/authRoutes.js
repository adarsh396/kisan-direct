const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/authController');

// 1. ADD THIS LINE HERE (Make sure the path to your middleware is correct)
const { protect } = require('../middleware/authMiddleware'); 

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. NOW THIS LINE WILL WORK
router.put('/profile', protect, updateUserProfile);

module.exports = router;