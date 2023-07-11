var express = require('express');
var router = express.Router();

const loginController = require('../app/controllers/LoginController');
const signupController = require('../app/controllers/SignUpController');

router.get('/login', loginController.login);
router.get('/signup', signupController.signup);

router.post('/users/store', signupController.store);
router.post('/users/login', loginController.signIn);

module.exports = router;