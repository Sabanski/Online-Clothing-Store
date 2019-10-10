/* eslint-disable func-names */
const _ = require('underscore');
// Function for getting breadcrumbs of the page
const getBreadCrumbs = function () {
  return function (req, res, next) {

    const urls = req.originalUrl.split('/');

    function getCurrentBreadCrumb() {
      urls.shift();
      req.breadcrumbs = urls.map((url, i) => ({
        breadcrumbName: (url === '' ? 'Home' : url.charAt(0).toUpperCase() + url.slice(1)),
        breadcrumbUrl: `/${urls.slice(0, i + 1).join('/')}`,
      }));
      next();
    }
    // Check if its on product page and swap the id of the product for the name and push it
    if (urls[4] === undefined) {
      getCurrentBreadCrumb();
    } else {
      const client = req.db;
      const db = client.db('store');
      const collection = db.collection('products');
      collection.find({ id: urls[4] }).toArray((collErr, items) => {
        _.each(items, (product) => {
          urls.pop();
          urls.push(product.name);
          getCurrentBreadCrumb();
        });
      });
    }
  };
};
module.exports = {
  getBreadCrumbs,
};
