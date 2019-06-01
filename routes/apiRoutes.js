// var db = require('../models');
var user = require('../controller/userQueries');
var trips = require('../controller/tripQueries');
var days = require('../controller/dayQueries');
var events = require('../controller/eventQueries');
var pklist = require('../controller/pklistQueries');
var helper = require('../utils/helperFunctions');
var budget = require('../controller/budgetQueries');
var flights = require('../controller/flightQueries');
var moment = require('moment');
var momentRange = require('moment-range');
var range = momentRange.extendMoment(moment)

module.exports = function (app, passport) {

  // * USER ROUTES
  // * =====================================

  // ! Route for getting all users
  app.get('/users', function (req, res) {
    user.getUsers(function (data) {
      res.send(data);
    });
  });

  // ! Route for logging in
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }));

  // ! Route for adding a user
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }), (req, res) => {
    var firstName = 'joe';
    var lastName = 'biden';
    var userName = 'example1234'
    var email = 'example@me.com'
    var password = 'enter123';
    user.addUser(firstName, lastName, userName, email, password, data => {
      console.log(data)
      res.send(data)
    })
  });

  // ! Route for deleting a user
  app.delete('/users/:id', function (req, res) {
    user.deleteUser(req.params.id, function (data) {
      console.log(data)

      res.json(data);
    });
  });

  // **** End of User Routes ****

  // * TRIP ROUTES
  // * =====================================


  // Route for getting trip title and dates
  app.get('/trip/title/:id', (req, res) => {
    trips.getTrip(req.params.id, data => {
      res.send(data)
    })
  });

  // Route for adding a trip
  app.post('/add/trip', function (req, res) {
    var title = req.body.title;
    var start = req.body.start
    var end = req.body.end
    var location = req.body.location
    var userId = req.body.userId
    console.log(req.body)
    trips.addTrip(title, start, end, location, userId, function (data) {


      var response = {
        id: data.id,
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        UserId: data.UserId
      };
      console.log(response)
      var dates = range.range(range(response.startDate), range(response.endDate))



      // This function auto populates every possible day from this trips date range into the database
      function addDays(id) {
        var results = Array.from(dates.by('day'));
        var arr = [];
        for (var i = 0; i < results.length; i++) {
          arr.push(moment(results[i]._d).format('YYYY-MM-DD'));
        }
        arr.push(response.endDate);

        helper.asynForEach(arr, async (event) => {
          console.log(event)
          await days.populateDays(event, id)
        }).then(() => {
          res.json(response);
        })
      }

      addDays(response.id)


    });
  });

  // Route for getting all trip attendees
  app.get('/trip/attendees/:id', (req, res) => {
    var id = req.params.id;
    user.getAttendees(id, data => {
      res.send(data)
    })
  });


  // Route for deleting a trip
  app.delete('/delete/trip/:id', function (req, res) {
    trips.deleteTrip(req.params.id, function (data) {
      console.log(data);
      res.json(data);
    });
  });

  // Route for getting all trips that a user owns and is associated with
  app.get('/user/trips/:id', function (req, res) {
    var id = req.params.id;
    user.user(id, function (data) {
      var myTrips = {
        owns: {
          trips: data
        },
        associated: {

        }
      };
      user.allTrips(id, function (data) {

        myTrips.associated.trips = data;

        res.json(myTrips);
      });

    });
  });

  // Route for the specific trip information page
  // This will send the packing list, and itinerary to the front end
  app.get('/trip/info/:id', function (req, res) {
    // Note this is the id for the specific trip

    trips.getTrips(req.params.id, function (resp, day, budget, dayInfo) {

      console.log(day);


      var info = {
        packing: resp,
        days: {
          date: dayInfo,
          dayPlan: [],
          bookedTimes: [],

        },
        budget: budget

      };

      function getData() {
        var dataArr = [];
        var times = [];
        helper.asynForEach(day.id, async (event) => {
          console.log('helper function event')
          console.log(event);
          await days.getDay(event).then(function (data) {
            console.log(data.days);
            console.log(data.times)
            times.push(data.times)
            dataArr.push(data.days);
            info.days.dayPlan = dataArr;
            info.days.bookedTimes = times
            // console.log(dataArr);
            // console.log('info object');
            // console.log(info);
          });
        }).then(() => {
          // console.log('info working');
          // console.log(info);
          res.send(info);
        });

      }
      getData();


    });
  });

  // End of Trip Routes ****


  // Start of Packing List Routes 

  app.post('/packing', (req, res) => {
    var item = req.body.item;
    var tripId = req.body.tripId;
    pklist.addItem(item, tripId, function (data) {
      res.send(data);
    });
  });

  app.get('/packing/:id', (req, res) => {
    // Note this id represents the trip id not the id for the packing list item ***
    pklist.getAll(req.params.id, data => {
      res.send(data);
    });
  });

  app.delete('/packing/:id', (req, res) => {
    // Note this is the id for the actual packing list item ***
    pklist.deleteItem(req.params.id, data => {
      console.log(data);
      res.json(data)
    });

  });

  app.put('/packing/:id', (req, res) => {
    // This route is for updating a single item in a specific packing list row
    // This should work for marking the item as packed (complete) and editing the item itself
    var colName = req.body.colName;
    var info = req.body.info;

    pklist.update(req.params.id, colName, info, data => {
      res.send(data);
    });
  });

  // This is the end of the Packing List Routes

  // This is the start of the Day Routes

  app.get('/days/:id', (req, res) => {
    // This route will return all days tied to a specific tripId
    // Note the id you are passing is the tripId ***
    // This route will give you an array of objects with the date and id for that day. 
    // after this api call you should run the app.get('/events/:id) api call 
    days.allDays(req.params.id, data => {
      res.send(data);
    });

  });




  app.post('/add/day', (req, res) => {
    // This route will add a day to a specific trip
    var date = req.body.date;
    var tripId = req.body.tripId;

    days.addDay(date, tripId, data => {
      res.send(data);
    });
  });

  app.delete('/delete/day/:id', (req, res) => {
    days.deleteDay(req.params.id, data => {
      console.log(data);
      res.json(data);
    });
  });

  // End of Day Routes

  // Start of Event Routes


  app.get('/events/:id', (req, res) => {
    // Note this id is the TripID
    // This will return to you an array of objects with all the planned activities for this specific trip
    // I was thinking you could then run them through a loop and assign them to each day 
    // based on the dayId that is contained in the object
    events.getAll(req.params.id, data => {
      res.send(data);
    });
  });

  app.post('/events/add', (req, res) => {
    // Note we will need the dayId and tripId each time an event is added so that they will populate propery afterwards
    var title = req.body.title;
    var time = req.body.time;
    var category = req.body.category;
    var description = req.body.description;
    var dayId = req.body.dayId;
    var tripId = req.body.tripId;


    events.addEvent(title, time, category, description, dayId, tripId, data => {
      res.send(data);
    });

  });

  app.put('/events/:id', (req, res) => {
    // Note this id is for the specific event
    // Right now I am having you pass in the column name we are upating
    // So this will only update a single column in the event as apposed to the whole object
    var colName = req.body.colName;
    var info = req.body.info;

    events.update(req.params.id, colName, info, data => {
      res.send(data);
    });

  });

  app.delete('/events/:id', (req, res) => {
    // Note this id is for the specific event

    events.deleteEvent(req.params.id, data => {
      res.json(data);
    });
  });

  // End of events routes

  // Budget Routes 

  app.get('/trip/budget/:id', (req, res) => [
    // Note this id is the tripId

    budget.tripTotal(req.params.id, data => {
      res.send(data);
    })
  ]);

  app.get('/day/budget/:id', (req, res) => {
    // Note this id is the DayId

    budget.dayTotal(req.params.id, data => {
      res.send(data);
    });
  });

  app.get('/alldays/budget/:id', (req, res) => {
    // Note this id is for the TripId

    budget.allDays(req.params.id, data => {
      res.send(data);
    });
  });

  app.post('/day/budget', (req, res) => {
    var item = req.body.item;
    var cost = req.body.cost;
    var dayId = req.body.dayId;
    var tripId = req.body.tripId;

    budget.addDayItem(item, cost, dayId, tripId, data => {
      res.send(data);
    });
  });

  app.post('/trip/budget', (req, res) => {
    var item = req.body.item;
    var cost = req.body.cost;
    var tripId = req.body.tripId;

    budget.addTripItem(item, cost, tripId, data => {
      res.send(data);
    });
  });

  app.delete('/budget/:id', (req, res) => {

    budget.delete(req.params.id, data => {
      console.log(data);
      res.json(data);
    });
  });

  app.put('/budget/:id', (req, res) => {
    var colName = req.body.colName;
    var info = req.body.info;

    budget.update(req.params.id, colName, info, data => {
      res.send(data);
    });
  });


  // * FLIGHT PRICING ROUTE
  app.post('/flights', (req, res) => {
    console.log(req.body)
    var info = {
      country: 'country=US',
      currency: 'currency=USD',
      flightClass: 'cabinClass=' + req.body.flightClass,
      inboundDate: 'inboundDate=' + req.body.inboundDate,
      outboundDate: 'outboundDate=' + req.body.outboundDate,
      adults: 'adults=' + req.body.adults,
      origin: 'originPlace=' + req.body.origin + '-sky',
      destination: 'destinationPlace=' + req.body.destination + '-sky',
      locale: 'locale=en-US'
    }
    console.log(info)

    flights.startSession(info, data => {
      console.log(data)
      var prices = [];
      for (var i = 0; i < data.length; i++) {
        var info = {};
        info.price = data[i].PricingOptions[0].Price;
        info.url = data[i].PricingOptions[0].DeeplinkUrl;
        prices.push(info)
      }
      res.send(prices)
    })
  })

};