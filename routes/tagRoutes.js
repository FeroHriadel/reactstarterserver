const express = require('express');
const router = express.Router();
const { createTag, getTags } = require('../controllers/tagControllers');
const { requireSignin, requireAdmin } = require('../middleware/auth');



router.post('/createtag', requireSignin, requireAdmin, createTag);
router.get('/gettags', getTags);
// router.get('/getcategory/:slug', getCategoryBySlug);
// router.put('/updatecategory', requireSignin, requireAdmin, updateCategory);
// router.delete('/deletecategory/:categoryid', requireSignin, requireAdmin, deleteCategoryv);



module.exports = router;