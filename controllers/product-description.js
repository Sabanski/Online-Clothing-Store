
const _ = require('underscore');
const soap = require('soap');

exports.getCurrentProduct = (req, res) => {
  const client = req.db;
  const db = client.db('store');
  const currenciesCollection = db.collection('currencies');
  const now = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const args = { Moneda: req.query.currencies };
  let currentPrice;
  let calculatedPrice;
  let selectedValue = req.query.currencies;

  // check of there is no selected value and assign the cookie to it
  if (typeof selectedValue === 'undefined') {
    selectedValue = req.cookies.selectedCookie;
  }
  res.cookie('selectedCookie', selectedValue);

  // Soap Service Controller
  function SoapController(args) {
    const url = 'http://infovalutar.ro/curs.asmx?wsdl';
    soap.createClient(url, (err, client) => {
      // call the service
      client.getlatestvalue(args, (err, res) => {
        // find and write the current value to the DBs
        collection.find({ id: args.Moneda }).forEach((result) => {
          result.value = res.getlatestvalueResult;
          result.date = new Date();
          collection.save(result);
        });
      });
    });
  }

  currenciesCollection.find({ id: 'USD' }).forEach((result) => {
    calculatedPrice = (result.value);
  });

  // Get the current price of the Currency
  function getPriceValue() {
    currenciesCollection.find({ id: selectedValue }).forEach((result) => {
      // It's been more than 24 hours so it's time to update the price
      if ((now - result.date.getTime()) > oneDay) {
        SoapController(args);
        currentPrice = result.value;
      } else {
        // It's under 24 hours so just get the value from the base
        currentPrice = result.value;
      }
    });
  }
  getPriceValue();

  // Push the data to the EJS template
  const collection = db.collection('products');
  collection.find({ id: req.params.productId }).toArray((collErr, items) => {
    calculatedPrice /= currentPrice;
    const path = req.originalUrl;
    res.render('product-description', {
      // Underscore.js lib
      _,
      // Template data
      title: 'Hello World!',
      items,
      breadcrumbs: req.breadcrumbs,
      currentPrice,
      calculatedPrice,
      path,
      selectedValue,
    });
  });
};
