var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

chai.use(chaiHttp);

var request;


describe('DELETE /users/:id', () => {


    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });


    it('Should delete a user from the database and return the number of users deleted (1)', done => {

        db.User.create({
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got.com',
            password: 'iknownothing'
        }).then(() => {

            request.delete('/users/1').end((err, res) => {

                expect(err).to.be.null;

                expect(res.status).to.equal(200);



                expect(res.body).to.equal(1)

                done();



            });



        })






    });


});