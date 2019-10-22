
const express = require('express');
const getBreadCrumbs = require('../middleware/breadcrumbs');

const categoriesController = require('../controllers/categories');

const router = express.Router();
// Landing page
router.get('/', getBreadCrumbs.getBreadCrumbs(), categoriesController.getAllCategories);

// Mens , Womens Categories and Subcategories
router.get('/:category', getBreadCrumbs.getBreadCrumbs(), categoriesController.getSubcategories);

module.exports = router;
