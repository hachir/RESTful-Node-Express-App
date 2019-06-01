var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('GET /alldays/budget/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    })


    it('Should get the budget for all the days planned in the trip', done => {

        db.User.create({
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got2.com',
            password: 'iknownothing'
        }).then(() => {}).then(() => {
            db.Trips.create({
                title: 'Island Hopping',
                startDate: '2019-08-18',
                endDate: '2019-08-25',
                location: 'Oahu, Hawaii',
                UserId: 1
            }).then(() => {
                db.Day.bulkCreate([{
                    date: '2019-08-19',
                    TripId: 1
                }, {
                    date: '2019-08-20',
                    TripId: 1
                }]).then(() => {
                    db.Budget.bulkCreate([{
                        item: 'Rental Car',
                        cost: 500,
                        TripId: 1
                    }, {
                        item: 'Surfing Lessons',
                        cost: 25,
                        DayId: 1,
                        TripId: 1
                    }, {
                        item: 'Rent Snorkeling Gear',
                        cost: 10,
                        DayId: 1,
                        TripId: 1
                    }, {
                        item: 'Shopping Spree',
                        cost: 100,
                        DayId: 2,
                        TripId: 1
                    }, {
                        item: 'Bar Hopping',
                        cost: 150,
                        DayId: 2,
                        TripId: 1
                    }]).then(() => {

                        request.get('/alldays/budget/1').end((err, res) => {
                            expect(err).to.be.null;

                            expect(res.status).to.equal(200);

                            console.log('daysbudget')
                            console.log(res.body)

                            expect(res.body).to.be.an('object');
                            expect(res.body.item).to.be.an('array').with.a.lengthOf(4);
                            expect(res.body.item[0]).to.be.an('object').that.includes({
                                id: 2,
                                item: 'Surfing Lessons',
                                cost: 25,
                                dayId: 1,
                                tripId: 1
                            });
                            expect(res.body.item[1]).to.be.an('object').that.includes({
                                id: 3,
                                item: 'Rent Snorkeling Gear',
                                cost: 10,
                                dayId: 1,
                                tripId: 1
                            });
                            expect(res.body.item[2]).to.be.an('object').that.includes({
                                id: 4,
                                item: 'Shopping Spree',
                                cost: 100,
                                dayId: 2,
                                tripId: 1
                            });
                            expect(res.body.item[3]).to.be.an('object').that.includes({
                                id: 5,
                                item: 'Bar Hopping',
                                cost: 150,
                                dayId: 2,
                                tripId: 1
                            });
                            expect(res.body.total).to.equal(285);
                            expect(res.body.average).to.equal(71.25);

                            done();

                        });
                    });

                });

            });

        });

    });
});