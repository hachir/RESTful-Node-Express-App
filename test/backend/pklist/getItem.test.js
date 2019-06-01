var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp)
var request;

describe('GET /packing/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        })

    });

    it('Should return a packing list item based on the tripId passed in', done => {

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
                        item: 'Sunscreen',
                        TripId: 1

                    }, {
                        item: 'Swimming Trunks',
                        TripId: 1

                    },
                    {
                        item: 'Bluetooth Speaker',
                        TripId: 1
                    },
                    {
                        item: 'Toothbrush',
                        TripId: 1
                    }
                ]).then(() => {


                    request.get('/packing/1').end((err, res) => {

                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);

                        console.log('pklist resbody')
                        console.log(res.body)
                        expect(res.body).to.be.an('array');
                        expect(res.body[0]).to.be.an('object').that.includes({
                            id: 1,
                            item: 'Sunscreen',
                            completed: false,
                            tripId: 1
                        });
                        expect(res.body[1]).to.be.an('object').that.includes({
                            id: 2,
                            item: 'Swimming Trunks',
                            completed: false,
                            tripId: 1
                        });
                        expect(res.body[2]).to.be.an('object').that.includes({
                            id: 3,
                            item: 'Bluetooth Speaker',
                            completed: false,
                            tripId: 1
                        });
                        expect(res.body[3]).to.be.an('object').that.includes({
                            id: 4,
                            item: 'Toothbrush',
                            completed: false,
                            tripId: 1
                        });


                        done();
                    });
                });


            });



        });



    });



});