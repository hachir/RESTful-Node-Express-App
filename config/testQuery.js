// var db = require('../models');

// db.Trips.find({
//     where: {
//         id: 3
//     },
//     include: [db.User]
// }).then(resp => {
//     console.log(resp)
//     db.Attendees.findAll({
//         where: {
//             TripId: 3
//         },
//         include: [db.User]
//     }).then(resp => {
//         console.log("Attendees")

//         for (var i = 0; i < resp.length; i++) {
//             console.log(resp[i].User.userName)
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }).catch(err => {
//     console.log(err)
// })

// db.User.findAll({
//     where: {
//         id: 1
//     },
//     include: [db.Trips]
// }).then(resp => {
//     console.log(resp)
//     console.log(resp[0].Trips)
// }).catch(err => {
//     console.log(err)
// })

// db.User.findAll({
//   where: {
//     id: 1
//   },
//   include: [db.Trips]
// }).then(resp => {
//   console.log(resp[0].dataValues.userName);
//   var id = resp[0].Trips[0].dataValues.id;
//   db.Trips.findAll({
//     where: {
//       id: id
//     },
//     include: [db.PkList, db.Day]
//   }).then(resp => {
//     console.log(resp[0].dataValues.title);
//     var packing = resp[0].PkLists;

//     for (var i = 0; i < packing.length; i++) {
//       console.log(packing[i].dataValues.item);
//     }
//     var day = resp[0].Days;

//     console.log(day[0].dataValues.date);
//     var id = day[0].dataValues.id;
    // for (var i = 0; i < day.length; i++) {
    //     console.log(day[i])
    // }
//     db.Day.findAll({
//       where: {
//         id: id
//       },
//       include: [db.Events]
//     }).then(resp => {

//       var event = resp[0].Events;
//       for (var i = 0; i < event.length; i++) {
//         console.log(event[i].dataValues.title);
//         console.log(event[i].dataValues.time);
//         console.log(event[i].dataValues.category);
//         console.log(event[i].dataValues.description);
//       }
//     }).catch(err => {
//       console.log(err);
//     });
//   }).catch(err => {
//     console.log(err);
//   });
// }).catch(err => {
//   console.log(err);
// });