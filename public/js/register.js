/* eslint-disable camelcase */
// * References to Page Elements
// * ================================================

var $firstName = $('#firstName').val().trim();
var $lastName = $('#lastName').val().trim();
var $email = $('.email').val().trim();
var $password = $('.password').val().trim();
var $register = $('#register-btn');

// * API Object with methods we need
// * ================================================
var API = {
  register: function (data) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/register',
      data: JSON.stringify(data)
    });
  }
};

// * Login handler function
// * ================================================

var registerHandler = function (event) {
  event.preventDefault();
  var userData = {
    first_name: $firstName,
    last_name: $lastName,
    email: $email,
    password: $password
  };

  // ! if data is missing, alert and exit
  // TODO Use CSS to create a more visual/user friendly alert
  if (!(userData.email && userData.password && userData.first_name && userData.last_name)) {
    alert('Please fill out all of the fields');
    return;
  }

  // ! Use login method to send data to db
  API.register(userData).then(function (response) {
    // ! Send to /dashboard if successful
    if (response.code === 200) { window.location.replace('/dashboard'); }

    // ! Alert and refresh if register didn't work
    // TODO Use CSS to create a more visual/user friendly alert and avoid refresh
    alert('Registration failed!');
    location.reload();
  });
};

// * Click event listener
// * ================================================

$register.on('click', registerHandler);