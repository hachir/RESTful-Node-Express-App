var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('POST /events/add', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })
    });

    it('Should add an event to the database', done => {

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

                    var reqBody = {
                        title: 'Snorkeling',
                        time: '12:00',
                        category: 'Activity',
                        description: 'Snorkeling with sharks',
                        dayId: 1,
                        tripId: 1
                    }

                    request.post('/events/add').send(reqBody).end((err, res) => {

                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);

                        expect(res.body).to.be.an('object').that.includes({
                            id: 1,
                            title: 'Snorkeling',
                            time: '12:00',
                            category: 'Activity',
                            description: 'Snorkeling with sharks',
                            dayId: 1,
                            tripId: 1
                        })

                        done();
                    });
                });
            });
        });

    });

});