var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);
var request;

describe('PUT /packing/:id', () => {

    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });

    });

    it('Should update a item selected by item id', done => {
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

                }, {
                    item: 'Bluetooth Speaker',
                    TripId: 1
                }, {
                    item: 'Toothbrush',
                    TripId: 1
                }]).then(() => {

                    var reqBody = {
                        colName: 'completed',
                        info: true
                    }

                    var reqBodyTwo = {
                        colName: 'item',
                        info: 'My Toothbrush'
                    }

                    request.put('/packing/3').send(reqBody).end((err, res) => {
                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);


                        expect(res.body).to.be.an('array').that.includes(1)


                    });

                    request.put('/packing/4').send(reqBodyTwo).end((err, res) => {
                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);


                        expect(res.body).to.be.an('array').that.includes(1)


                    })

                    request.put('/packing/1').send(reqBody).end((err, res) => {
                        expect(err).to.be.null;

                        expect(res.status).to.equal(200);


                        expect(res.body).to.be.an('array').that.includes(1)

                        done();
                    })
                })

            })

        })


    })


})