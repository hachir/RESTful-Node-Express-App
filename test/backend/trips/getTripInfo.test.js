var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);

var request;


describe('GET /trip/info/:id', () => {


    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    });


    it('Should get all data associated with a specific trip id', done => {

        db.User.create({
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got2.com',
            password: 'iknownothing'
        }).then(() => {
            db.Trips.create({
                title: 'Island Hopping',
                startDate: '2019-08-18',
                endDate: '2019-08-25',
                location: 'Oahu, Hawaii',
                UserId: 1
            }).then(() => {
                db.PkList.bulkCreate([{
                    item: 'Swimsuit',
                    TripId: 1
                }, {
                    item: 'Sunscreen',
                    TripId: 1
                }]).then(() => {
                    db.Day.bulkCreate([{
                        date: '2019-06-21',
                        TripId: 1
                    }, {
                        date: '2019-06-22',
                        TripId: 1
                    }]).then(() => {
                        db.Events.bulkCreate([{
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
                                title: 'Yoga',
                                time: '6:00am',
                                category: 'Activity',
                                description: 'Yoga on the beach',
                                DayId: 1,
                                TripId: 1
                            },
                            {
                                title: 'Snorkeling',
                                time: '12:00',
                                category: 'Activity',
                                description: 'Snorkeling with sharks',
                                DayId: 1,
                                TripId: 1
                            }
                        ]).then(() => {


                            request.get('/trip/info/1').end((err, res) => {

                                expect(err).to.be.null;

                                expect(res.status).to.equal(200);
                                console.log("rebody")
                                console.log(res.body.days.dayPlan[1])

                                expect(res.body.packing).to.be.an('array').that.includes(
                                    'Swimsuit', 'Sunscreen'
                                );

                                expect(res.body.days.date).to.be.an('array').that.includes(
                                    '2019-06-21', '2019-06-22'
                                );

                                expect(res.body.days.dayPlan[0][0]).to.be.an('array').that.includes(
                                    'Yoga', '6:00am', 'Activity', 'Yoga on the beach',
                                    ['Snorkeling', '12:00', 'Activity', 'Snorkeling with sharks']


                                );


                                expect(res.body.days.dayPlan[1][0]).to.be.an('array').that.includes(
                                    'Swimming', '6pm', 'Activity', 'Swim in the ocean',
                                    ['Barmidstva', '4:00pm', 'Food', 'Celebrate']
                                );



                                done();


                            });


                        });


                    });

                });



            });



        });





    });






});