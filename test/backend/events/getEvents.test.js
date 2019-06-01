var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('GET /events/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });

    it('Should get all events tied to a tripId', done => {
        db.User.create({
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got2.com',
            password: 'iknownothing'
        }).then(() => {
            db.Trips.bulkCreate([{
                title: 'Island Hopping',
                startDate: '2019-08-18',
                endDate: '2019-08-25',
                location: 'Oahu, Hawaii',
                UserId: 1
            }, {
                title: 'Spring Break Getaway',
                startDate: '2019-06-20',
                endDate: '2019-06-25',
                location: 'Bali, Indonesia',
                UserId: 1
            }]).then(() => {
                db.Day.bulkCreate([{
                        date: '2019-08-19',
                        TripId: 1
                    },
                    {
                        date: '2019-08-20',
                        TripId: 1
                    },
                    {
                        date: '2019-06-21',
                        TripId: 2
                    },
                    {
                        date: '2019-06-22',
                        TripId: 2
                    },
                ]).then(() => {
                    db.Events.bulkCreate([{
                            title: 'Snorkeling',
                            time: '12:00',
                            category: 'Activity',
                            description: 'Snorkeling with sharks',
                            DayId: 1,
                            TripId: 1
                        },
                        {
                            title: 'Yoga',
                            time: '6:00am',
                            category: 'Activity',
                            description: 'Yoga on the beach',
                            DayId: 1,
                            TripId: 1
                        },
                        {
                            title: 'Swimming',
                            time: '6pm',
                            category: 'Activity',
                            description: 'Swim in the ocean',
                            DayId: 2,
                            TripId: 1
                        },
                        {
                            title: 'Barmidstva',
                            time: '4:00pm',
                            category: 'Food',
                            description: 'Celebrate',
                            DayId: 2,
                            TripId: 1
                        },
                        {
                            title: 'Pool Party',
                            time: '4:00pm',
                            category: 'Activity',
                            description: 'Meet up with friends for pool party',
                            DayId: 1,
                            TripId: 2
                        },
                        {
                            title: 'Breakfast with the in-laws',
                            time: '8:00am',
                            category: 'Food',
                            description: 'Meet kia`s parents for breakfast',
                            DayId: 1,
                            TripId: 2
                        },
                        {
                            title: 'Bar Hopping',
                            time: '10:00pm',
                            category: 'Activity',
                            description: 'Go bar hopping on the strip',
                            DayId: 2,
                            TripId: 2
                        },
                    ]).then(() => {

                        request.get('/events/1').end((err, res) => {
                            expect(err).to.be.null;

                            expect(res.status).to.equal(200);



                            expect(res.body).to.be.an('array').with.a.lengthOf(4);
                            expect(res.body[0]).to.be.an('object').that.includes({
                                id: 1,
                                title: 'Snorkeling',
                                time: '12:00',
                                category: 'Activity',
                                description: 'Snorkeling with sharks',
                                dayId: 1,
                                tripId: 1
                            });
                            expect(res.body[1]).to.be.an('object').that.includes({
                                id: 2,
                                title: 'Yoga',
                                time: '6:00am',
                                category: 'Activity',
                                description: 'Yoga on the beach',
                                dayId: 1,
                                tripId: 1
                            });
                            expect(res.body[2]).to.be.an('object').that.includes({
                                id: 3,
                                title: 'Swimming',
                                time: '6pm',
                                category: 'Activity',
                                description: 'Swim in the ocean',
                                dayId: 2,
                                tripId: 1
                            });
                            expect(res.body[3]).to.be.an('object').that.includes({
                                id: 4,
                                title: 'Barmidstva',
                                time: '4:00pm',
                                category: 'Food',
                                description: 'Celebrate',
                                dayId: 2,
                                tripId: 1
                            })

                        })
                        request.get('/events/2').end((err, res) => {
                            expect(err).to.be.null;

                            expect(res.status).to.equal(200);

                            expect(res.body).to.be.an('array').with.a.lengthOf(3);

                            expect(res.body[0]).to.be.an('object').that.includes({
                                id: 5,
                                title: 'Pool Party',
                                time: '4:00pm',
                                category: 'Activity',
                                description: 'Meet up with friends for pool party',
                                dayId: 1,
                                tripId: 2
                            });
                            expect(res.body[1]).to.be.an('object').that.includes({
                                id: 6,
                                title: 'Breakfast with the in-laws',
                                time: '8:00am',
                                category: 'Food',
                                description: 'Meet kia`s parents for breakfast',
                                dayId: 1,
                                tripId: 2
                            });
                            expect(res.body[2]).to.be.an('object').that.includes({
                                id: 7,
                                title: 'Bar Hopping',
                                time: '10:00pm',
                                category: 'Activity',
                                description: 'Go bar hopping on the strip',
                                dayId: 2,
                                tripId: 2
                            });

                            done();

                        })

                    })

                })

            })

        })

    })

})