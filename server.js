// * The App Requires
// * ==========================================
require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
var db = require('./models');
var app = express();
var PORT = process.env.PORT || 3000;
// * PassportJS Requires
// * ==========================================
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');

// * PassportJS Configuration - Connect to our database
// * ==========================================

require('./config/passport')(passport, db.User); // * pass passport for configuration

// * The Middleware - Set up our app
// * ==========================================
app.use(morgan('dev')); // ! log every request to the console
app.use(cookieParser()); // ! read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// * The View - Handlebars
// * ==========================================
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// * PassportJS Methods
// * ==========================================
app.use(session({
  secret: 'be excellent to each other',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // ! persistent login sessions
app.use(flash()); // ! use connect-flash for flash messages stored in session


// * The Routes
// * ==========================================
// ! Load  routes and pass in  app and passport 
var apiRoute = require('./routes/apiRoutes')(app, passport);
var htmlRoute = require('./routes/htmlRoutes')(app, passport);

// * Passport strategies
// * ==========================================
require('./config/passport')(passport, db.User);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;