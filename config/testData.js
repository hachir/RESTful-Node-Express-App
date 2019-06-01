var db = require('../models');

// // adding test data

// // db.User.create({
// //     firstName: 'James',
// //     lastName: 'Cameron',
// //     userName: 'james1232',
// //     email: 'james1232@me.com',
// //     password: 'enter123!'
// // }).then(function (resp) {
// //     console.log(resp);
// // }).catch(function (err) {
// //     console.log(err);
// // });

// // db.User.create({
// //     firstName: 'Brandon',
// //     lastName: 'Burr',
// //     userName: 'brandon1232',
// //     email: 'brandon1232@me.com',
// //     password: 'enter123!'
// // }).then(function (resp) {
// //     console.log(resp);
// // }).catch(function (err) {
// //     console.log(err);
// // });

// // db.User.create({
// //     firstName: 'Eric',
// //     lastName: 'Frazier',
// //     userName: 'eric1232',
// //     email: 'eric1232@me.com',
// //     password: 'enter123!'
// // }).then(function (resp) {
// //     console.log(resp);
// // }).catch(function (err) {
// //     console.log(err);
// // });

// db.Trips.create({
//   title: 'Spring Break Getaway',
//   startDate: '2019-06-20',
//   endDate: '2019-06-25',
//   location: 'Bali, Indonesia',
//   UserId: 1
// }).then(function (resp) {
//   console.log(resp);
// }).catch(function (err) {
//   console.log(err);
// });

// db.Trips.create({
//   title: 'Island Hopping',
//   startDate: '2019-08-18',
//   endDate: '2019-08-25',
//   location: 'Oahu, Hawaii',
//   UserId: 1
// }).then(function (resp) {
//   console.log(resp);
// }).catch(function (err) {
//   console.log(err);
// });

// db.Trips.create({
//   title: 'Castle Cowabunga',
//   startDate: '2019-09-09',
//   endDate: '2019-10-01',
//   location: 'Berlin, Germany',
//   UserId: 1
// }).then(function (resp) {
//   console.log(resp);
// }).catch(function (err) {
//   console.log(err);
// });

// db.Attendees.create({
//   UserId: 1,
//   TripId: 11
// }).then(function (resp) {
//   console.log(resp);
// }).catch(function (err) {
//   console.log(err);
// });

// db.Attendees.create({
//   UserId: 2,
//   TripId: 11
// }).then(function (resp) {
//   console.log(resp);
// }).catch(function (err) {
//   console.log(err);
// });

// db.Day.create({
//   date: '2019-06-20',
//   TripId: 4
// }).then(resp => {
//   console.log(resp);
// }).catch(err => {
//   console.log(err);
// });
// db.Day.create({
//   date: '2019-06-21',
//   TripId: 4
// }).then(resp => {
//   console.log(resp);
// }).catch(err => {
//   console.log(err);
// });
// db.Day.create({
//   date: '2019-06-22',
//   TripId: 4
// }).then(resp => {
//   console.log(resp);
// }).catch(err => {
//   console.log(err);
// });

// db.Events.create({
//     title: 'Snorkeling',
//     time: '12:00',
//     category: 'Activity',
//     description: 'Snorkeling with sharks',
//     DayId: 1,
//     TripId: 1
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {
//     console.log(err);
// });

// db.Events.create({
//     title: 'Yoga',
//     time: '6:00am',
//     category: 'Activity',
//     description: 'Yoga on the beach',
//     DayId: 1,
//     TripId: 1
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {
//     console.log(err);
// });

// db.PkList.create({
//     item: 'Swimsuit',
//     TripId: 11
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {
//     console.log(err);
// });

// db.PkList.create({
//     item: 'Sunscreen',
//     TripId: 11
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {
//     console.log(err);
// });

// db.Day.create({
//     date: '2019-06-22',
//     TripId: 11
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {

//     console.log(err);
// });

// db.PkList.create({
//   item: 'Swimsuit',
//   TripId: 11
// }).then(resp => {
//   console.log(resp)
// }).catch(err => {
//   console.log(err)
// })

// db.PkList.create({
//   item: 'Sunscreen',
//   TripId: 11
// }).then(resp => {
//   console.log(resp)
// }).catch(err => {
//   console.log(err)
// })

// db.Day.create({
//     date: "2019-06-22",
//     TripId: 1
// }).then(resp => {
//     console.log(resp)
// }).catch(err => {
//     console.log(err)
// })

// db.Events.create({
//     title: 'Swimming',
//     time: '6pm',
//     category: 'Activity',
//     description: 'Swim in the ocean',
//     DayId: 2,
//     TripId: 1
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {
//     console.log(err);
// });

// db.Events.create({
//     title: 'Barmidstva',
//     time: '4:00pm',
//     category: 'Food',
//     description: 'Celebrate',
//     DayId: 2,
//     TripId: 1
// }).then(resp => {
//     console.log(resp);
// }).catch(err => {
//     console.log(err);
// });

// db.Budget.create({
//     item: 'Rental Car',
//     cost: 500,
//     TripId: 1
// }).then(resp => {
//     console.log(resp)
// }).catch(err => {
//     console.log(err)
// })

// db.Budget.create({
//     item: 'Surfing Lessons',
//     cost: 25,
//     DayId: 2,
//     TripId: 1
// }).then(resp => {
//     console.log(resp)
// }).catch(err => {
//     console.log(err)
// });

// db.Budget.create({
//     item: 'Barmidstva Cost',
//     cost: 30,
//     DayId: 2,
//     TripId: 1
// }).then(resp => {
//     console.log(resp)
// }).catch(err => {
//     console.log(err)
// });

// db.Budget.create({
//     item: 'Rent Snorkeling Gear',
//     cost: 10,
//     DayId: 1,
//     TripId: 1
// }).then(resp => {
//     console.log(resp)
// }).catch(err => {
//     console.log(err)
// });