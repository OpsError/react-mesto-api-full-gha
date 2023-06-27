const router = require('express').Router();
const { validateSignUp, validateSignIn } = require('../middlewares/validate');
const { login, createUser } = require('../controllers/users');

router.post('/signin', validateSignIn, login);

router.post('/signup', validateSignUp, createUser);

module.exports = router;
