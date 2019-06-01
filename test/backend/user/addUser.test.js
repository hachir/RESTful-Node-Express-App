var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../../server');
var db = require('../../../models');
var expect = chai.expect;

console.log(expect);

chai.use(chaiHttp);

var request;

describe('POST /signup', () => {


    beforeEach(() => {
        request = chai.request(server);
        return db.sequelize.sync({
            force: true
        });
    });


    it('Should add a user to the database', done => {
        var reqBody = {
            firstName: 'Jon',
            lastName: 'Snow',
            userName: 'jonsnow123',
            email: 'jonsnow@got.com',
            password: 'iknownothing'
        };

        request.post('/signup').send(reqBody).end((err, res) => {

            expect(err).to.be.null;
            console.log(res.status)
            expect(res.status).to.equal(200);
            console.log('addUser')
            console.log(res)

            done();
        });

    });
});