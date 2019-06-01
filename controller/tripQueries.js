var db = require('../models');
var moment = require('moment')

module.exports = {

  getTrip: (id, cb) => {
    db.Trips.findAll({
      where: {
        id: id
      }
    }).then(resp => {
      console.log(resp)
      var trip = {
        id: resp[0].dataValues.id,
        title: resp[0].dataValues.title,
        startDate: moment(resp[0].dataValues.startDate).add(1, 'day').format('YYYY-MM-DD'),
        endDate: moment(resp[0].dataValues.endDate).add(1, 'day').format('YYYY-MM-DD'),
        location: resp[0].dataValues.location,
        userId: resp[0].dataValues.UserId
      }

      cb(trip)
    })

  },

  getTrips: function (id, cb) {
    db.Trips.findAll({
      where: {
        id: id
      },
      include: [db.PkList, db.Day, db.Budget]
    }).then(function (resp) {
      var packing = resp[0].PkLists;

      var list = [];

      for (var i = 0; i < packing.length; i++) {
        var items = {

        }
        items.id = packing[i].dataValues.id;
        items.item = packing[i].dataValues.item;
        items.completed = packing[i].dataValues.completed;
        items.tripId = packing[i].dataValues.TripId;
        list.push(items);
      }

      var days = resp[0].Days;

      var dayInfo = [];

      var day = {
        id: [],
        date: []
      };

      for (var i = 0; i < days.length; i++) {
        var info = {};
        info.id = days[i].dataValues.id
        info.date = moment(days[i].dataValues.date).add(1, 'day').format('YYYY-MM-DD');
        dayInfo.push(info)
        day.id.push(days[i].dataValues.id);
        day.date.push(moment(days[i].dataValues.date).add(1, 'day').format('YYYY-MM-DD'));
      }





      // for (var i = 0; i < days.length; i++) {
      //   day.id.push(days[i].dataValues.id);
      //   day.date.push(moment(days[i].dataValues.date).add(1, 'day').format('YYYY-MM-DD'));

      // }
      var budgets = resp[0].Budgets;

      var budget = {
        budgets: [],
        total: 0
      };

      for (var i = 0; i < budgets.length; i++) {
        var info = {};
        info.id = budgets[i].dataValues.id;
        info.item = budgets[i].dataValues.item;
        info.cost = budgets[i].dataValues.cost;
        info.dayId = budgets[i].dataValues.DayId;
        info.tripId = budgets[i].dataValues.TripId;
        budget.total += budgets[i].dataValues.cost
        budget.budgets.push(info)
      }



      cb(list, day, budget, dayInfo);
    }).catch(function (err) {
      console.log(err);
    });


  },

  addTrip: function (title, start, end, location, userId, cb) {
    db.Trips.create({
      title: title,
      startDate: start,
      endDate: end,
      location: location,
      UserId: userId
    }).then(function (resp) {

      cb(resp);
    }).catch(function (err) {
      console.log(err);
      cb(err)
    });
  },

  deleteTrip: function (id, cb) {
    db.Trips.destroy({
      where: {
        id: id
      }
    }).then(function (resp) {
      console.log(resp);
      cb(resp);
    }).catch(function (err) {
      console.log(err);
    });
  },


  update: function (id, colName, info, cb) {
    db.Trips.update({
      [colName]: info
    }, {
      where: {
        id: id
      }
    }).then(function (resp) {
      console.log(resp);
      cb(resp);
    }).catch(function (err) {
      console.log(err);
    });
  }

};