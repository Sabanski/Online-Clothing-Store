/* eslint-disable func-names */
// Function for getting breadcrumbs of the page
const getBreadCrumbs = function () {
  return function (req, res, next) {
    const urls = req.originalUrl.split('/');
    urls.shift();
    req.breadcrumbs = urls.map((url, i) => ({
      breadcrumbName: (url === '' ? 'Home' : url.charAt(0).toUpperCase() + url.slice(1)),
      breadcrumbUrl: `/${urls.slice(0, i + 1).join('/')}`,
    }));
    next();
  };
};
module.exports = {
  getBreadCrumbs,
};
