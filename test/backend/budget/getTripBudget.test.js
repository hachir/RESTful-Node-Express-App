var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('GET /trip/budget/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    })
    it('Should return a trip total along with all budgeted items', () => {

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

                        request.get('/trip/budget/1').end((err, res) => {
                            expect(err).to.be.null;

                            expect(res.status).to.equal(200);

                            console.log('trip total')
                            console.log(res.body)


                            done();

                        });

                    })
                })
            })

        })

    })


})