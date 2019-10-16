const _ = require('underscore');
const soap = require('soap');

exports.getCurrentProduct = (req, res) => {
  console.log('In product controller')
  const client = req.db;
  const db = client.db('store');
  const currenciesCollection = db.collection('currencies');
  let now = new Date();
  const oneDay = 60 * 60 * 24 * 1000;

  var args = { Moneda: req.query.currencies };
  let currentPrice;
  let selectedValue = req.query.currencies;

  // Soap Service Controller
  function SoapController(args) {
    var url = 'http://infovalutar.ro/curs.asmx?wsdl';
    soap.createClient(url, function (err, client) {
      // call the service
      client.getlatestvalue(args, function (err, res) {
        const client = req.db;
        const db = client.db('store');
        const collection = db.collection('currencies');
        // find and write the current value to the DBs
        collection.find({ id: args.Moneda }).forEach(function (result) {
          console.log(result);
          result.value = res.getlatestvalueResult;
          result.date = new Date();
          collection.save(result);
        })
      });
    });
  }

  // Get the current price of the Currency
  function getPriceValue() {
    currenciesCollection.find({ id: args.Moneda }).forEach(function (result) {
      // It's been more than 24 hours so it's time to update the price
      if ((now - result.date.getTime()) > oneDay) {
        console.log('Its been more than 24h')
        SoapController(args);
        currentPrice = result.value;
      } else {
        // It's under 24 hours so just get the value from the base
        console.log('Under 24 hours');
        currentPrice = result.value;
      };
    });
  }
  // Check whats the selected currency
  if (args.Moneda === 'BGN') {
    console.log('Its BGN');
    getPriceValue();
  } else if (args.Moneda === 'USD') {
    console.log('Its USD');
    getPriceValue();
  } else {
    console.log('Its EUR');
    getPriceValue();
  }

  // Push the data to the EJS template
  const collection = db.collection('products');
  collection.find({ id: req.params.productId }).toArray((collErr, items) => {
    const path = req.originalUrl;
    res.render('product-description', {
      // Underscore.js lib
      _,

      // Template data
      title: 'Hello World!',
      items,
      breadcrumbs: req.breadcrumbs,
      currentPrice: currentPrice,
      path: path,
      selectedValue: selectedValue,
    });
  });
}