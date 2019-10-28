const _ = require('underscore');

exports.getAllCategories = (req, res, next) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('categories');
  collection.find().toArray((collErr, items) => {
    res.render('landing-page', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Online Store',
      items,
      breadcrumbs: req.breadcrumbs,
    });
  });
}

exports.getSubcategories = (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('categories');
  collection.find({ id: req.params.category }).toArray((collErr, items) => {
    res.render('categories', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Online Store',
      items,
      breadcrumbs: req.breadcrumbs,
    });
  });
}