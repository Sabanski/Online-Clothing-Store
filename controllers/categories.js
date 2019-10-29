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

exports.getCategoryProducts = (req, res) => {
  const ITEMS_PER_PAGE = 20;
  const page = +req.query.page || 1;
  let totalItems;
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const regexName = new RegExp(`^${req.params.category}*`);

  collection.find({ primary_category_id: { $regex: regexName } })
    .count()
    .then((numProducts) => {
      totalItems = numProducts;
      return collection.find({ primary_category_id: { $regex: regexName } })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .toArray((collErr, items) => {
          res.render('categories', {
            // Underscore.js lib
            _,

            // Template data
            items,
            title: 'Hi',
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
};