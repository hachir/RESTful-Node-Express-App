var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('DELETE /budget/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    });

    it('Should delete the budget item of the given id', done => {
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
                    date: '2019-08-20',
                    TripId: 1
                }).then(() => {
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
                        }

                    ]).then(() => {

                        request.delete('/budget/1').end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.status).to.equal(200);
                            expect(res.body).to.equal(1)

                        });
                        request.delete('/budget/2').end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.status).to.equal(200);
                            expect(res.body).to.equal(1)
                        })
                        request.delete('/budget/3').end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.status).to.equal(200);
                            expect(res.body).to.equal(1);
                            done();
                        })
                    })
                })
            })
        })

    })

})