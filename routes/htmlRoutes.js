/* eslint-disable camelcase */
// Dependencies
// =============================================================
// var path = require('path');
// var db = require('../models');
var helper = require('../utils/helperFunctions');

module.exports = function (app) {
  // ! Home page 
  app.get('/', helper.isLoggedIn, function (req, res) {

    res.render('landing');
  });

  // ! Landing page route
  app.get('/landing', function (req, res) {

    res.render('landing');
  });

  // ! Login page route
  app.get('/login', function (req, res) {

    res.render('login');
  });

  // ! Signup page route
  app.get('/signup', function (req, res) {

    res.render('signup');
  });

  // ! Dashboard route
  app.get('/dashboard/', helper.isLoggedIn, function (req, res) {
    res.render('dashboard', { user: req.user });
  });

  // ! Logout route
  app.get('/logout', helper.isLoggedIn, function (req, res) {

    req.session.destroy(function (err) {
      res.redirect('/');
    });

  });

  // ! Trip route 
  app.get('/trip/:id', helper.isLoggedIn, function (req, res) {
    res.render('trip', { id: req.params.id });
  });

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404');
  });
};