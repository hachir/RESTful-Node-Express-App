var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('PUT /events/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    })

    it('Should update the desired data for a specific event in the database', done => {
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
                db.Day.create({
                    date: '2019-08-19',
                    TripId: 1
                }).then(() => {
                    db.Events.create({
                        title: 'Snorkeling',
                        time: '12:00',
                        category: 'Activity',
                        description: 'Snorkeling with sharks',
                        DayId: 1,
                        TripId: 1
                    }).then(() => {
                        var reqBody = {
                            colName: 'title',
                            info: 'Snorkeling With Sharks'
                        }

                        var reqBodyTwo = {
                            colName: 'time',
                            info: '10:00am'
                        }

                        var reqBodyThree = {
                            colName: 'DayId',
                            info: 2
                        }

                        request.put('/events/1').send(reqBody).end((err, res) => {
                            expect(err).to.be.null;

                            expect(res.status).to.equal(200);


                            expect(res.body).to.be.an('array').that.includes(1)


                        })
                        request.put('/events/1').send(reqBodyTwo).end((err, res) => {
                            expect(err).to.be.null;

                            expect(res.status).to.equal(200);


                            expect(res.body).to.be.an('array').that.includes(1)
                            done();
                        });

                    })

                })

            })
        })

    })

})