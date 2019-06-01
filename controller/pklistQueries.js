var db = require('../models');

module.exports = {

  getAll: function (id, cb) {
    db.PkList.findAll({
      where: {
        TripId: id
      }
    }).then(function (resp) {
      var results = []



      for (var i = 0; i < resp.length; i++) {
        var items = {

        }
        items.id = resp[i].dataValues.id;
        items.item = resp[i].dataValues.item;
        items.completed = resp[i].dataValues.completed;
        items.tripId = resp[i].dataValues.TripId;
        results.push(items);
      }

      cb(results);
    }).catch(function (err) {
      console.log(err);
    });
  },

  addItem: function (item, tripId, cb) {
    db.PkList.create({
      item: item,
      TripId: tripId
    }).then(function (resp) {


      var results = {
        id: resp.dataValues.id,
        item: resp.dataValues.item,
        completed: resp.dataValues.completed,
        tripId: resp.dataValues.TripId

      }
      console.log(results)

      cb(results);
    }).catch(function (err) {
      console.log(err);
    });

  },

  deleteItem: function (id, cb) {
    db.PkList.destroy({
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
    db.PkList.update({
      [colName]: info
    }, {
      where: {
        id: id
      }
    }).then(function (resp) {
      console.log('pk query')
      console.log(resp);
      cb(resp);
    }).catch(function (err) {
      console.log(err);
    });
  }


};