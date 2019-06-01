var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);

var request;

describe('POST /login', () => {


    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });

    it('Should log a user in', done => {
        var reqBody = {
            email: 'jonsnow123@got.com',
            password: 'iknownothing'

        };


        db.User.create({
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow1235',
            email: 'jonsnow123@got.com',
            password: 'iknownothing'
        }).then(() => {
            request.post('/login').send(reqBody).end((err, res) => {

                expect(err).to.be.null;

                expect(res.status).to.equal(200);



                done();



            });
        })







    });



});