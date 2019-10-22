/* eslint-disable global-require */
// Module dependencies.
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const expressMongoDb = require('express-mongo-db');
// Routes paths
const routes = {
  index: require('./routes/index'),
  products: require('./routes/products'),
};

const app = express();

// All environments
app.set('port', 1666);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(expressMongoDb('mongodb://localhost:27017'));
app.use(cookieParser('61d333a8-6325-4506-96e7-a180035cc26f'));
app.use(session({
  secret: 'forkpoint training',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'))
app.use(errorHandler());

// App routes
app.use('/', routes.index);
app.use('/:categories', routes.products);

// Run server
app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${app.get('port')}`);
});
