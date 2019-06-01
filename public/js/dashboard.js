// * Get references to page elements
// **************************************************
let $upcoming = $('#upcoming-trips');
let $past = $('#past-trips');
let $suggested = $('#suggested-trips')
let $createTrip = $('#create-trip');


// * The API object contains methods for each kind of request we'll make
// **************************************************
const API = {
  getTrips: function () {
    return $.ajax({
      url: '../user/trips/' + $id,
      type: 'GET'
    });
  },
  addTrip: function (data) {
    return $.ajax({
      url: '../add/trip',
      type: 'POST',
      data: data
    });
  },
  asyncForEach: async function (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
};

// * Add trips
// ***************************************************

let modalHandler = function (event) {
  event.preventDefault();

  let $title = $('#title').val(),
    $location = $('#location').val(),
    $startDate = $('#startDate').val(),
    $endDate = $('#endDate').val();

  let tripData = {
    title: $title,
    location: $location,
    start: $startDate,
    end: $endDate,
    userId: $id
  };

  API.addTrip(tripData).then(function (response) {
    console.log(response)
    if (!(response.id === undefined)) {
      return location.reload();
    } else {
      alert('Please make sure your trip\'s dates are set in the future!');
      return location.reload();
    }
  })
};

// * Render trips
// ***************************************************
let upcomingTrips = [],
  pastTrips = [],
  sortedUpcoming = [],
  sortedPast = [];

let getTripsData = function () {
  API.getTrips()
    .done(function (userTrips) {
      // ! trips is an array of objects
      // * Separate trips into upcoming and past trips

      userTrips.owns.trips.forEach(trip => {
        // * Compare Dates
        let today = moment();

        if (moment(trip.endDate) > today) {
          // ! trip is UPCOMING
          upcomingTrips.push(trip);
        } else {
          // ! trip is PAST
          pastTrips.push(trip);
        }
      });

      let associatedTrips = userTrips.associated.trips;
      console.log(associatedTrips)

      for (let i = 0; i < associatedTrips.length; i++) {
        // * Compare Dates
        let today = moment();

        if (moment(associatedTrips[i].endDate) > today) {
          // ! trip is UPCOMING
          upcomingTrips.push(associatedTrips[i]);
        } else {
          // ! trip is PAST
          pastTrips.push(associatedTrips[i]);
        }
      }

      if (upcomingTrips.length === 0) {
        renderSuggestions();
      } else if (upcomingTrips.length > 0 && upcomingTrips.length < 3) {
        renderTrips();
        renderSuggestions();
      } else {
        renderTrips();
      }

    })
    .fail(function (err) {
      console.log(err);
      return;
    });
};

let renderTrips = function () {
  // * Order trips from closest to furthest
  sortedUpcoming = upcomingTrips.sort((a, b) => moment(a.startDate) - moment(b.startDate))
  sortedPast = pastTrips.sort((a, b) => moment(b.startDate) - moment(a.startDate))

  // * Generate cards and render on the page
  if (sortedUpcoming.length === 1) {
    $('#upcoming-container').prepend(`<h2 class="p-3">Your next adventure</h2>`);
    API.asyncForEach(sortedUpcoming, async (trip) => printCard($upcoming, trip, createCard));
  }
  if (sortedUpcoming.length > 1) {
    $('#upcoming-container').prepend(`<h2 class="p-3">Your next adventures</h2>`);
    API.asyncForEach(sortedUpcoming, async (trip) => printCard($upcoming, trip, createCard));
  }

  if (sortedPast.length > 0) {
    $('#past-container').prepend(`<hr class="mt-4"> <h2 class="p-3">Where you've been</h2>`);
    API.asyncForEach(sortedPast, async (trip) => printCard($past, trip, createCard));
  }
}

let getImage = function (keyword) {
  return new Promise(resolve => {
    resolve($.ajax({
      url: `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${keyword}&orientation=landscape&client_id=0835aa91744ff770da738c90338caf0cc765e0799c60ec1ff42ba91f216a0ab0`
    }).then(function (pics) {
      let random = Math.floor(Math.random() * 10)
      return pics.results[random].urls.regular
    }))
  });
}

let getDate = function (str) {

  if (!(moment(str) > moment())) {
    return moment(str).fromNow(true) + ' ago'
  } else {
    return 'in ' + moment(str).fromNow(true)
  }
}

async function createCard(container, tripObj) {
  let imgUrl = await getImage(tripObj.location.split(',')[0]);
  // * Code to Create Bootstrap Card with jQuery
  let $card = $('<div>').addClass('card shadow');
  let $a = $('<a>').attr('href', '/trip/' + tripObj.id);
  let $cardImg = $('<img>').addClass('card-img-top').attr({
    src: imgUrl,
    alt: tripObj.title
  });
  let $cardBody = $('<div>').addClass('card-body');
  let $cardTitle = $('<h5>')
    .addClass('card-title')
    .text(tripObj.title);
  let $cardText = $('<div>')
    .addClass('card-text')
    .html(tripObj.location + '<br />' + getDate(tripObj.startDate));

  $cardBody.append($cardTitle, $cardText);
  $a.append($cardImg, $cardBody);
  $card.append($a);

  return container.append($card);
};

async function createSuggestedCard(container, tripObj) {
  let imgUrl = await getImage(tripObj.location.split(',')[0]);
  // * Code to Create Bootstrap Card with jQuery
  let $card = $('<div>').addClass('card shadow');
  let $a = $('<a>').addClass('suggested').attr({
    'href': '#',
    'data-toggle': 'modal',
    'data-target': '#addTripModal',
    'data-title': tripObj.title,
    'data-location': tripObj.location
  });
  let $cardImg = $('<img>').addClass('card-img-top').attr({
    src: imgUrl,
    alt: tripObj.title
  });
  let $cardBody = $('<div>').addClass('card-body');
  let $cardTitle = $('<h5>')
    .addClass('card-title')
    .text(tripObj.title);
  let $cardText = $('<div>')
    .addClass('card-text')
    .html(tripObj.location);

  $cardBody.append($cardTitle, $cardText);
  $a.append($cardImg, $cardBody);
  $card.append($a);

  return container.append($card);

}

let printCard = function (container, trip, creator) {
  return creator(container, trip);
};

// * Suggested Trips 
// ***************************************************

// * Fancy Shuffler Algorithm
function shuffler(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// * Higher Order Function to random elements from one array to another
function pushRandom(source, target, shuffler, quantity) {
  for (let i = 0; i < quantity; i++) {
    let idx = Math.floor(Math.random() * source.length);
    target.push(shuffler(source)[idx]);
  }
  return target;
}

let suggestedData = [
  {
    title: 'Paris',
    location: 'Paris, France'
  },
  {
    title: 'Yellowstone',
    location: 'Yellowstone National Park, USA'
  },
  {
    title: 'Rome',
    location: 'Rome, Italy'
  },
  {
    title: 'Tahiti',
    location: 'Tahiti, French Polynesia'
  },
  {
    title: 'London',
    location: 'London, UK'
  },
  {
    title: 'South Island',
    location: 'South Island, New Zealand'
  },
  {
    title: 'Phuket',
    location: 'Phuket, Thailand'
  },
  {
    title: 'Grand Canyon',
    location: 'Grand Canyon National Park, USA'
  },
  {
    title: 'Dubai',
    location: 'Dubai, United Arab Emirates'
  },
  {
    title: 'New York City',
    location: 'Manhattan, NY'
  },
  {
    title: 'Patagonia',
    location: 'Patagonia, Argentina'
  },
  {
    title: 'Barcelona',
    location: 'Barcelona, Spain'
  },
  {
    title: 'Yosemite',
    location: 'Yosemite National Park, USA'
  }
];

let randomTrips = [];

// * Generate suggested trips
function renderSuggestions() {
  $('#suggested-container').prepend(`<h2 class="p-3">Suggested Trips</h2>`);
  API.asyncForEach(pushRandom(suggestedData, randomTrips, shuffler, 3), async (trip) => printCard($suggested, trip, createSuggestedCard));
  $('#suggested-container').append(`<hr class="mt-4">`);
}

// * Click handler for suggested cards
function suggestedHandler() {
  $('#title').val($(this).data('title'));
  $('#location').val($(this).data('location'));
}


// * ON LOAD
// ***************************************************
$(function () {


  // * Render Trip Cards
  getTripsData();

  // * Set Date Constraints on Trip Creation
  let $today = moment().format('YYYY-MM-DD');
  $('#startDate').attr('min', $today);
  $('#endDate').attr('min', $today);

  // * Create Trip Click Listener
  $createTrip.on('click', modalHandler);

  // * Suggested Trip Click Listener
  $(document).on('click', 'a.suggested', suggestedHandler);

});