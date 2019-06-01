var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('POST /trip/budget', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    })

    it('Should add a trip budget item to the database', done => {

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
                    db.Budget.create({
                        item: 'Surfing Lessons',
                        cost: 25,
                        DayId: 1,
                        TripId: 1
                    }).then(() => {
                        var reqBody = {
                            item: 'Rental Car',
                            cost: 500,
                            tripId: 1
                        }


                        request.post('/trip/budget').send(reqBody).end((err, res) => {
                            expect(err).to.be.null;
                            expect(res.status).to.equal(200);

                            console.log('1')
                            console.log(res.body)
                            expect(res.body).to.be.an('object').that.includes({
                                id: 2,
                                item: 'Rental Car',
                                cost: 500,
                                tripId: 1
                            })
                            done();
                        });


                    })
                })

            })
        })



    })

})