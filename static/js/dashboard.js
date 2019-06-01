// * Get references to page elements
// **************************************************
var $id = window.location.href.split('/');
var $upcoming = $('#upcoming-trips');
var $past = $('#past-trips');
console.log($id[$id.length - 1]);

// * The API object contains methods for each kind of request we'll make
// **************************************************
var API = {
  getTrips: function() {
    return $.ajax({
      url: '../user/trips/' + $id[$id.length - 1],
      type: 'GET'
    });
  }
};

// * Render trips
// ***************************************************
var upcomingTrips = [],
  pastTrips = [];
var renderTrips = function() {
  API.getTrips()
    .done(function(userTrips) {
      // ! trips is an array of objects
      // * Separate trips into upcoming and past trips
      console.log('owned trips:');
      console.log(userTrips.owns.trips);
      console.log('associated trips:');
      console.log(userTrips.associated.trips);

      userTrips.owns.trips.forEach(trip => {
        // * Compare Dates
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(trip.endDate) > today) {
          // ! trip is UPCOMING
          upcomingTrips.push(trip);
        } else {
          // ! trip is PAST
          pastTrips.push(trip);
        }
      });

      var associatedTrips = userTrips.associated.trips;
      for (var i = 0; i < userTrips.associated.trips.length; i++) {
        // * Compare Dates
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(associatedTrips[i].Trip.endDate) > today) {
          // ! trip is UPCOMING
          upcomingTrips.push(associatedTrips[i].Trip);
        } else {
          // ! trip is PAST
          pastTrips.push(associatedTrips[i].Trip);
        }
      }

      console.log(upcomingTrips);
      console.log(pastTrips);

      // * Generate cards and render on the page
      upcomingTrips.forEach(trip => printCard($upcoming, trip));
      pastTrips.forEach(trip => printCard($past, trip));
    })
    .fail(function(err) {
      console.log(err);
      return;
    });
};

var createCard = function(tripObj) {
  // * Code to Create Materialize Card with jQuery
  var $card = $('<div>').addClass('card');
  var $a = $('<a>').attr('href', '/trips/' + tripObj.id);
  var $cardImageContainer = $('<div>').addClass('card-image');
  var $cardImg = $('<img>').attr({
    src: 'unsplash/api/call?',
    alt: tripObj.title
  });
  var $cardTitle = $('<span>')
    .addClass('card-title')
    .text(tripObj.title);
  var $cardContent = $('<div>')
    .addClass('card-content')
    .text(tripObj.location);

  $cardImageContainer.append($cardImg, $cardTitle);
  $a.append($cardImageContainer, $cardContent);
  $card.append($a);

  return $card;
};

var printCard = function(container, trip) {
  container.append(createCard(trip));
};

$(function() {
  renderTrips();
});
