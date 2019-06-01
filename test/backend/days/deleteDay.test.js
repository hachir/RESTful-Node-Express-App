var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('DELETE /delete/day/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });


    it('Should delete a day from the database and return 1', done => {

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

                    request.delete('/delete/day/1').end((err, res) => {
                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);

                        expect(res.body).to.equal(1);

                        done();



                    });

                });

            });

        });

    });

});