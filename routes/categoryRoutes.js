const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryBySlug, updateCategory } = require('../controllers/categoryControllers');
const { requireSignin, requireAdmin } = require('../middleware/auth');



router.post('/createcategory', requireSignin, requireAdmin, createCategory);
router.get('/getcategories', getCategories);
router.get('/getcategory/:slug', getCategoryBySlug);
router.put('/updatecategory', requireSignin, requireAdmin, updateCategory);



module.exports = router;