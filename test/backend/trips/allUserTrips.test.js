var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);

var request;

describe('GET /user/trips/:id', () => {


    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })

    })


    it('Should get all the trips a user owns and is associated with', done => {

        db.User.bulkCreate([{
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got2.com',
            password: 'iknownothing'


        }, {
            firstName: 'Eric',
            lastName: 'Frazier',
            userName: 'eric1232',
            email: 'eric1232@me.com',
            password: 'enter123!'
        }]).then(() => {
            db.Trips.bulkCreate([{
                    title: 'Island Hopping',
                    startDate: '2019-08-18',
                    endDate: '2019-08-25',
                    location: 'Oahu, Hawaii',
                    UserId: 1
                },
                {
                    title: 'Castle Cowabunga',
                    startDate: '2019-09-09',
                    endDate: '2019-10-01',
                    location: 'Berlin, Germany',
                    UserId: 2
                },
                {
                    title: 'Spring Break Getaway',
                    startDate: '2019-06-20',
                    endDate: '2019-06-25',
                    location: 'Bali, Indonesia',
                    UserId: 2
                }
            ]).then(() => {

                db.Attendees.bulkCreate([{
                    UserId: 1,
                    TripId: 3
                }, {
                    UserId: 1,
                    TripId: 2
                }]).then(() => {


                    request.get('/user/trips/1').end((err, res) => {
                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);




                        // expect(res.body.owns.trips).to.be.an('array').that.includes({
                        //     id: 1,
                        //     title: 'Island Hopping',
                        //     startDate: '2019-08-18',
                        //     endDate: '2019-08-25',
                        //     location: 'Oahu, Hawaii',
                        //     UserId: 1
                        // });

                        // Try to add further validation for this test by matching up the information 
                        // for each object like above

                        expect(res.body.owns.trips).to.be.an('array').with.a.lengthOf(1);
                        expect(res.body.associated.trips).to.be.an('array').with.a.lengthOf(2);

                        done();




                    })



                })





            })


        })




    })




})