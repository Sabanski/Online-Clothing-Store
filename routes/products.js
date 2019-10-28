const _ = require('underscore');
const express = require('express');
const getBreadCrumbs = require('../middleware/breadcrumbs');


const productController = require('../controllers/product-description');
const productsListingController = require('../controllers/products-listing');

const router = express.Router();


// Sub Category Product Listing
router.get('/:subCategory', getBreadCrumbs.getBreadCrumbs(), productsListingController.getSubCategoryProducts);

// Specific Category Products Listing
router.get('/:subCategory/:categoryProducts', getBreadCrumbs.getBreadCrumbs(), productsListingController.getSpecificCategoryProducts);

// Product Description
router.get('/:category/:subCategory/:productId', getBreadCrumbs.getBreadCrumbs(), productController.getCurrentProduct);

module.exports = router;
