const express = require('express');
const router = express.Router();
const { createTag, getTags, getTagBySlug, updateTag } = require('../controllers/tagControllers');
const { requireSignin, requireAdmin } = require('../middleware/auth');



router.post('/createtag', requireSignin, requireAdmin, createTag);
router.get('/gettags', getTags);
router.get('/gettag/:slug', getTagBySlug);
router.put('/updatetag', requireSignin, requireAdmin, updateTag);
// router.delete('/deletecategory/:categoryid', requireSignin, requireAdmin, deleteCategoryv);



module.exports = router;