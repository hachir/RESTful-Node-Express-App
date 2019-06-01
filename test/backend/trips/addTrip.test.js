var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);

var request;


describe('POST /add/trip', () => {


    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });


    it('Should add a trip to the database', done => {



        var reqBody = {
            title: 'Island Hopping',
            start: '2019-08-18',
            end: '2019-08-25',
            location: 'Oahu, Hawaii',
            userId: 1

        }

        db.User.create({
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got.com',
            password: 'iknownothing'
        }).then(() => {


            request.post('/add/trip').send(reqBody).end((err, res) => {

                expect(err).to.be.null;

                expect(res.status).to.equal(200);

                console.log(res.body);


                expect(res.body).to.be.an('object').that.includes({
                    id: 1,
                    title: 'Island Hopping',
                    startDate: '2019-08-18T00:00:00.000Z',
                    endDate: '2019-08-25T00:00:00.000Z',
                    location: 'Oahu, Hawaii',
                    UserId: 1


                });


                done();

            })






        })


    })








})