const _ = require('underscore');
const express = require('express');
const getBreadCrumbs = require('../middleware/breadcrumbs');

const router = express.Router();

// Sub Category Product Listing
router.get('/:subCategory', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const regexName = new RegExp(`^${req.params.subCategory}*`);
  const categoryUrl = req.originalUrl;
  collection.find({ primary_category_id: { $regex: regexName } }).toArray((collErr, items) => {
    res.render('products', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Hello World!',
      items,
      categoryUrl,
      breadcrumbs: req.breadcrumbs,
    });
  });
});

// Specific Category Products Listing
router.get('/:subCategory/:categoryProducts', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const page = req.query.page;
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const categoryUrl = req.originalUrl;
  collection.find({ primary_category_id: req.params.categoryProducts }).toArray((collErr, items) => {
    res.render('products', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Hello World!',
      items,
      categoryUrl,
      breadcrumbs: req.breadcrumbs,
    });
  });
});

// Product Description
router.get('/:category/:subCategory/:productId', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  collection.find({ id: req.params.productId }).toArray((collErr, items) => {
    res.render('product-description', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Hello World!',
      items,
      breadcrumbs: req.breadcrumbs,
    });
  });
});


module.exports = router;
