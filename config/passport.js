// * config/passport.js

// * load all the things we need
var bCrypt = require('bcrypt-nodejs');

// ! expose this function to our app using module.exports
module.exports = function (passport, user) {

  var LocalStrategy = require('passport-local').Strategy;
  var User = user;

  // ! =========================================================================
  // ! Passport session setup ==================================================
  // ! =========================================================================
  // ! Required for persistent login sessions
  // ! Passport needs ability to serialize and unserialize users out of session
  // ! used to serialize the user (save a user ID) for the session

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // ! used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findOne({ where: { id: id } }).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // ! =========================================================================
  // ! LOCAL SIGNUP ============================================================
  // ! =========================================================================

  passport.use(
    'local-signup',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
      function (req, email, password, done) {

        //! Generate hash
        var getHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

        // ! Find a user whose email is the same as the forms email
        // ! We are checking to see if the user trying to login already exists
        // ! If not, we will create one.
        User.findOne({
          where: {
            email: email
          }
        }).then(function (user) {
          if (user) {
            return done(null, false, {
              message: 'That email is already taken'
            });
          } else {
            var userPassword = getHash(password);
            var data =
            {
              email: email,
              password: userPassword,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName
            };

            User.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }));

  // ! =========================================================================
  // ! LOCAL LOGIN ============================================================
  // ! =========================================================================

  passport.use('local-login', new LocalStrategy(

    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback

    },


    function (req, email, password, done) {

      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }

      User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {

        if (!user) {
          return done(null, false, {
            message: 'Email does not exist'
          });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function (err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));
};