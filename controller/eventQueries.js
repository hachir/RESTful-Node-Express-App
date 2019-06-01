var db = require('../models');

module.exports = {


  getAll: function (id, cb) {
    db.Events.findAll({
      where: {
        TripId: id
      }
    }).then(function (resp) {
      var results = {
        days: [],
        times: []
      };

      for (var i = 0; i < resp.length; i++) {
        var info = {

        }
        var timeInfo = {}
        info.id = resp[i].dataValues.id;
        info.title = resp[i].dataValues.title;
        info.time = resp[i].dataValues.time;
        info.category = resp[i].dataValues.category;
        info.description = resp[i].dataValues.description;
        info.dayId = resp[i].dataValues.DayId;
        info.tripId = resp[i].dataValues.TripId;
        timeInfo.dayId = resp[i].dataValues.DayId;
        timeInfo.time = resp[i].dataValues.time;
        results.times.push(timeInfo)
        results.days.push(info)
      }


      cb(results);
    }).catch(function (err) {
      console.log(err);
    });


  },

  addEvent: function (title, time, category, description, dayId, tripId, cb) {
    db.Events.create({
      title: title,
      time: time,
      category: category,
      description: description,
      DayId: dayId,
      TripId: tripId
    }).then(function (resp) {
      var results = {
        id: resp.dataValues.id,
        title: resp.dataValues.title,
        time: resp.dataValues.time,
        category: resp.dataValues.category,
        description: resp.dataValues.description,
        dayId: resp.dataValues.DayId,
        tripId: resp.dataValues.TripId
      }
      cb(results);
    }).catch(function (err) {
      console.log(err);
    });

  },

  deleteEvent: function (id, cb) {
    db.Events.destroy({
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
    db.Events.update({
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