var db = require('../models');
var moment = require('moment');

module.exports = {

  getUsers: function (cb) {
    db.User.findAll({}).then(function (resp) {
      cb(resp);
    }).catch(function (err) {
      console.log(err);
    });

  },

  user: function (id, cb) {
    db.User.findAll({
      where: {
        id: id
      },
      include: [db.Trips]
    }).then(function (resp) {

      var trips = resp[0].Trips;

      var results = [];

      for (var i = 0; i < trips.length; i++) {
        var tripInfo = {};
        tripInfo.id = trips[i].dataValues.id;
        tripInfo.title = trips[i].dataValues.title;
        tripInfo.startDate = moment(trips[i].dataValues.startDate).add(1, 'day').format("YYYY-MM-DD");
        console.log(moment(trips[i].dataValues.startDate).add(1, 'day').format("YYYY-MM-DD"))
        tripInfo.endDate = moment(trips[i].dataValues.endDate).add(1, 'day').format("YYYY-MM-DD");
        tripInfo.location = trips[i].dataValues.location;
        tripInfo.UserId = trips[i].dataValues.UserId;
        results.push(tripInfo);
      }

      cb(results);
    }).catch(function (err) {
      console.log(err);
    });
  },

  login: function (email, password, cb) {
    db.User.findAll({
      where: {
        email: email,
        password: password
      }
    }).then(function (resp) {

      cb(resp);
    });
  },

  allTrips: function (id, cb) {
    db.Attendees.findAll({
      where: {
        UserId: id
      },
      include: [db.Trips]
    }).then(function (resp) {

      var results = [];



      for (var i = 0; i < resp.length; i++) {
        var tripInfo = {

        };
        var trips = resp[i].Trip;

        tripInfo.id = trips.dataValues.id;
        tripInfo.title = trips.dataValues.title;
        tripInfo.startDate = moment(trips.dataValues.startDate).add(1, 'day').format('YYYY-MM-DD');
        tripInfo.endDate = moment(trips.dataValues.endDate).add(1, 'day').format('YYYY-MM-DD');
        tripInfo.location = trips.dataValues.location;
        tripInfo.UserId = trips.dataValues.UserId;
        results.push(tripInfo)

      }

      cb(results);
    }).catch(function (err) {
      console.log(err);
    });

  },

  addUser: function (firstName, lastName, userName, email, password, cb) {
    db.User.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password
    }).then(function (resp) {

      cb(resp);
    }).catch(function (err) {
      console.log(err);
    });
  },

  deleteUser: function (id, cb) {
    db.User.destroy({
      where: {
        id: id
      }
    }).then(function (resp) {

      cb(resp);
    }).catch(function (err) {
      console.log(err);
    });
  },

  addAttendee: (userId, tripId, cb) => {
    db.Attendees.create({
      UserId: userId,
      TripId: tripId
    }).then(resp => {
      console.log(resp)

      cb(resp)
    })
  },

  getAttendees: (id, cb) => {
    db.Attendees.findAll({
      where: {
        TripId: id
      },
      include: [db.User]
    }).then(resp => {
      console.log(resp)

      var results = [];
      for (var i = 0; i < resp.length; i++) {
        var user = {};
        user.id = resp[i].dataValues.User.id;
        user.firstName = resp[i].dataValues.User.firstName;
        user.lastName = resp[i].dataValues.User.lastName;
        user.userName = resp[i].dataValues.User.userName;
        user.email = resp[i].dataValues.User.email
        results.push(user)
      }

      cb(results)
    }).catch(err => {
      console.log(err);
    })

  }




};