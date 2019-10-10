const _ = require('underscore');
const express = require('express');
const getBreadCrumbs = require('../middleware/breadcrumbs');

const router = express.Router();
// Landing page
router.get('/', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('categories');
  collection.find().toArray((collErr, items) => {
    res.render('categories', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Online Store',
      items,
      breadcrumbs: req.breadcrumbs,
    });
  });
});

// Mens , Womens Categories and Subcategories
router.get('/:category', getBreadCrumbs.getBreadCrumbs(), (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('categories');
  collection.find({ id: req.params.category }).toArray((collErr, items) => {
    res.render('categories', {
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
