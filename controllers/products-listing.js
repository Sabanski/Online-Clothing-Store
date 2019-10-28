const _ = require('underscore');

const ITEMS_PER_PAGE = 20;
let totalItems;

exports.getSubCategoryProducts = (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const categoryUrl = req.originalUrl.split('?');
  const page = +req.query.page || 1;
  const regexName = new RegExp(`^${req.params.subCategory}*`);
  let subCategoryName = (req.originalUrl.split('/'));
  const paginationName = (subCategoryName[2].split('?'));
  subCategoryName = (`${subCategoryName[2]}-${paginationName[0]}`);
  const subCategoryTitle = (subCategoryName.split('-'));
  const titleName = (subCategoryTitle[3].charAt(0).toUpperCase() + subCategoryTitle[3].slice(1));


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
            title: titleName,
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
};

exports.getSpecificCategoryProducts = (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const collection = db.collection('products');
  const categoryUrl = req.originalUrl.split('?');
  const page = +req.query.page || 1;
  const arrayForTitle = (req.params.categoryProducts.split('-'));
  let titleName = (arrayForTitle[arrayForTitle.length - 1]);
  titleName = titleName.charAt(0).toUpperCase() + titleName.slice(1);
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
            title: titleName,
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
}
