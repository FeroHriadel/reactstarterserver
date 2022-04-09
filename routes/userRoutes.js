const express = require('express');
const router = express.Router();
const { signup, signin, getUser } = require('../controllers/userControllers');
const { requireSignin } = require('../middleware/auth');



router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getuser', requireSignin, getUser);



module.exports = router;