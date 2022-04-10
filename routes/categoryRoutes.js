const express = require('express');
const router = express.Router();
const { createCategory } = require('../controllers/categoryControllers');
const { requireSignin, requireAdmin } = require('../middleware/auth');



router.post('/createcategory', requireSignin, requireAdmin, createCategory);




module.exports = router;