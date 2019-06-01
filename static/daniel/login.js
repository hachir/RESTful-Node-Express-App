// * References to Page Elements
// **************************************************
console.log('login.js ran');
var $login = $('#login-btn');

// * API Object with methods we need
// **************************************************
var API = {
  login: function (data) {
    return $.ajax({
      type: 'POST',
      url: '/login',
      data: data
    });
  }
};

// * Login handler function
// * ================================================

var loginHandler = function (event) {
  event.preventDefault();
  var $email = $('#email').val().trim();
  var $password = $('#password').val().trim();
  var userData = {
    email: $email,
    password: $password
  };
  console.log(userData);

  // ! if email or password are missing, alert and exit
  // TODO Use CSS to create a more visual/user friendly alert
  if (!(userData.email && userData.password)) {
    alert('Please enter an email address and password!');
    return;
  }

  // ! Use login method to send data to db
  API.login(userData).then(function (response) {
    // ! Send to /dashboard if successful
    console.log('api called!');
    if (response.length > 0) { return window.location.replace('/dashboard/' + response[0].id); }



    // ! Alert and refresh if auth didn't work
    // TODO Use CSS to create a more visual/user friendly alert and avoid refresh
    alert('Email and/or password combination incorrect');
    return location.reload();
  });
};

// * Click event listener
// * ================================================

$login.on('click', loginHandler);