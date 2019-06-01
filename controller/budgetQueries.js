var db = require('../models');

module.exports = {

    tripTotal: (id, cb) => {

        db.Budget.findAll({
            where: {
                TripId: id
            }
        }).then(resp => {
            console.log(resp)
            var tripTotal = {
                item: [],
                total: 0
            }
            for (var i = 0; i < resp.length; i++) {
                var info = {};
                info.id = resp[i].dataValues.id;
                info.item = resp[i].dataValues.item;
                info.cost = resp[i].dataValues.cost;
                info.dayId = resp[i].dataValues.DayId;
                info.tripId = resp[i].dataValues.TripId;


                tripTotal.total += resp[i].dataValues.cost;
                tripTotal.item.push(info)
            }

            cb(tripTotal)
        }).catch(err => {
            console.log(err)
        })
    },

    dayTotal: (id, cb) => {
        db.Budget.findAll({
            where: {
                DayId: id
            }
        }).then(resp => {
            console.log(resp)
            var dayTotal = {
                item: [],
                total: 0
            }
            for (var i = 0; i < resp.length; i++) {
                dayTotal.item.push(resp[i].dataValues);
                dayTotal.total += resp[i].dataValues.cost;

            }

            cb(dayTotal)
        }).catch(err => {
            console.log(err)
        })


    },


    allDays: (id, cb) => {

        db.Budget.findAll({
            where: {
                TripId: id
            }
        }).then(resp => {

            var daysTotal = {
                item: [],
                total: 0
            }


            for (var i = 0; i < resp.length; i++) {
                var item = {};
                if (resp[i].dataValues.DayId !== null) {
                    item.id = resp[i].dataValues.id;
                    item.item = resp[i].dataValues.item;
                    item.cost = resp[i].dataValues.cost;
                    item.dayId = resp[i].dataValues.DayId;
                    item.tripId = resp[i].dataValues.TripId;

                    daysTotal.item.push(item);
                    daysTotal.total += resp[i].dataValues.cost;

                }

            }


            daysTotal.average = daysTotal.total / daysTotal.item.length;

            cb(daysTotal);
        }).catch(err => [
            console.log(err)
        ])


    },

    addDayItem: (item, cost, dayId, tripId, cb) => {
        db.Budget.create({
            item: item,
            cost: cost,
            DayId: dayId,
            TripId: tripId
        }).then(resp => {

            var result = {
                id: resp.dataValues.id,
                item: resp.dataValues.item,
                cost: resp.dataValues.cost,
                dayId: resp.dataValues.DayId,
                tripId: resp.dataValues.TripId

            }

            cb(result)

        }).catch(err => {
            console.log(err)
        })

    },

    addTripItem: (item, cost, tripId, cb) => {
        db.Budget.create({
            item: item,
            cost: cost,
            TripId: tripId
        }).then(resp => {
            var result = {
                id: resp.dataValues.id,
                item: resp.dataValues.item,
                cost: resp.dataValues.cost,
                tripId: resp.dataValues.TripId
            }

            cb(result)
        }).catch(err => {
            console.log(err)
        })


    },

    delete: (id, cb) => {
        db.Budget.destroy({
            where: {
                id: id
            }
        }).then(resp => {
            cb(resp)
        }).catch(err => {
            console.log(err)
        })

    },

    update: (id, colName, info, cb) => {
        db.Budget.update({
            [colName]: info
        }, {
            where: {
                id: id
            }
        }).then(resp => {
            cb(resp)
        }).catch(err => {
            console.log(err)
        })

    }


}