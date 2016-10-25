
/**
 * Module dependencies.
 */
var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    prismic = require('prismic-nodejs'),
    configuration = require('./prismic-configuration').Configuration
var app = express();

app.locals.general = require('./includes/general');

// Prismic.io configuration

prismic.init(app, configuration, handleError)


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon("public/images/punch.png"));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('1234'));
app.use(session({secret: '1234', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler());

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send("Not found");
  } else {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
}


var PORT = app.get('port');

app.listen(PORT, function() {
  console.log('Express server listening on http://localhost:' + PORT);
});
