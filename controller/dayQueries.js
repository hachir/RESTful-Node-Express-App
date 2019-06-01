var db = require('../models');
var moment = require('moment');


module.exports = {


  allDays: (id, cb) => {
    db.Day.findAll({
      where: {
        tripId: id
      }

    }).then(resp => {
      console.log(resp[0])
      var day = {
        days: []

      }
      for (var i = 0; i < resp.length; i++) {
        var date = {
          id: '',
          date: ''
        }
        date.id = resp[i].dataValues.id;
        date.date = moment(resp[i].dataValues.date).add(1, 'day').format('YYYY-MM-DD');

        day.days.push(date);

      };

      console.log(day)

      cb(day)
    }).catch(err => [
      console.log(err)
    ])


  },

  populateDays: function (date, tripId) {
    return new Promise(function (resolve, reject) {

      db.Day.create({
        date: date,
        TripId: tripId
      }).then(function (resp) {
        console.log(resp);
        var results = {
          id: resp.dataValues.id,
          date: moment(resp.dataValues.date).add(1, 'day').format('YYYY-MM-DD'),
          tripId: resp.dataValues.TripId
        }


        resolve(results)
      }).catch(function (err) {
        reject(err);
      });



    })
  },


  getDay: function (id) {
    return new Promise(function (resolve, reject) {


      db.Day.findAll({
        where: {
          id: id
        },
        include: [db.Events]
      }).then(function (resp) {
        var event = resp[0].Events;
        var day = {
          days: [],
          times: []
        };
        console.log(event.length + " event length")
        for (var i = 0; i < event.length; i++) {
          if (event.length > 0) {
            var info = {}
            var timeInfo = {}
            info.id = event[i].dataValues.id
            info.title = event[i].dataValues.title;
            info.time = event[i].dataValues.time;
            info.category = event[i].dataValues.category;
            info.description = event[i].dataValues.description
            info.dayId = event[i].dataValues.DayId;
            timeInfo.dayId = event[i].dataValues.DayId;
            timeInfo.time = event[i].dataValues.time;
            day.times.push(timeInfo);
            day.days.push(info);
          }

        };
        console.log('day query day')
        console.log(day)

        resolve(day);
      }).catch(function (err) {
        reject(err);
      })
    })
  },

  addDay: function (date, tripId, cb) {
    db.Day.create({
      date: date,
      TripId: tripId
    }).then(function (resp) {
      console.log(resp);
      var results = {
        id: resp.dataValues.id,
        date: moment(resp.dataValues.date).add(1, 'day').format('YYYY-MM-DD'),
        tripId: resp.dataValues.TripId
      }


      cb(results);
    }).catch(function (err) {
      console.log(err);
    });

  },

  deleteDay: function (id, cb) {
    db.Day.destroy({
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



}