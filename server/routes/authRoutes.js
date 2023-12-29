const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Define routes for user registration and login
router.post('/register', authController.register); // Route for user registration
router.post('/login', authController.login); // Route for user login
router.get('/find/:userId', authController.findUser); // Route for user login
router.get('/users', authController.getUsers); // Route for user login

module.exports = router;