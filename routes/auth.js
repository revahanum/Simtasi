const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.register);

router.get('/signin', (req, res) => res.render('signin'));
router.post('/signin', authController.login);

module.exports = router;
