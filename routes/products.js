const _ = require('underscore');
const express = require('express');
const getBreadCrumbs = require('../middleware/breadcrumbs');

const router = express.Router();
const ITEMS_PER_PAGE = 20;
let totalItems;

// Sub Category Product Listing
router.get('/:subCategory', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const regexName = new RegExp(`^${req.params.subCategory}*`);
  const categoryUrl = req.originalUrl.split('?');
  const page = +req.query.page || 1;

  collection.find({ primary_category_id: { $regex: regexName } })
    .count()
    .then((numProducts) => {
      totalItems = numProducts;
      return collection.find({ primary_category_id: { $regex: regexName } })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .toArray((collErr, items) => {
          res.render('products', {
            // Underscore.js lib
            _,

            // Template data
            title: 'Hello World!',
            items,
            categoryUrl: categoryUrl[0],
            breadcrumbs: req.breadcrumbs,
            currentPage: Math.ceil(page),
            hasPage: ITEMS_PER_PAGE > totalItems,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
            totalItems,
          });
        });
    });


});

// Specific Category Products Listing
router.get('/:subCategory/:categoryProducts', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const categoryUrl = req.originalUrl.split('?');
  const page = +req.query.page || 1;

  collection.find({ primary_category_id: req.params.categoryProducts }).count()
    .then((numProducts) => {
      totalItems = numProducts;
      return collection.find({ primary_category_id: req.params.categoryProducts })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .toArray((collErr, items) => {
          res.render('products', {
            // Underscore.js lib
            _,

            // Template data
            title: 'Hello World!',
            items,
            categoryUrl: categoryUrl[0],
            breadcrumbs: req.breadcrumbs,
            currentPage: page,
            hasPage: ITEMS_PER_PAGE < totalItems,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
            totalItems,
          });
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
