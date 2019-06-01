var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('GET /days/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });

    it('Should return all of the days for a specific tripId', done => {

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
                        date: "2019-06-22",
                        TripId: 1
                    },
                    {
                        date: "2019-06-23",
                        TripId: 1
                    },
                    {
                        date: "2019-06-24",
                        TripId: 1
                    }

                ]).then(() => {

                    request.get('/days/1').end((err, res) => {
                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);

                        console.log(res.body);
                        expect(res.body.days).to.be.an('array').with.a.lengthOf(3);
                        expect(res.body.days[0]).to.be.an('object').that.includes({
                            id: 1,
                            date: '2019-06-22'
                        });
                        expect(res.body.days[1]).to.be.an('object').that.includes({
                            id: 2,
                            date: '2019-06-23'
                        });
                        expect(res.body.days[2]).to.be.an('object').that.includes({
                            id: 3,
                            date: '2019-06-24'
                        });

                        done();
                    })

                });

            });
        });


    });

});