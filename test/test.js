const assert = require('assert')
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../models/user')

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)
// Our parent block
describe('Users', () => {
  beforeEach((done) => { // Before each test we empty the database
    User.deleteMany({}, (err) => {
      done()
    })
  })
  /*
  * Test the /GET route
  */
  // describe('/post users', () => {
  //     it('it should Register New User', (done) => {
  //       chai.request(server)
  //           .post('/users/register')
  //           .end((err, res) => {
  //                 res.should.have.status(200);
  //                 res.body.should.be.a('array');
  //                 res.body.length.should.be.eql(0);
  //             done();
  //           });
  //     });
  // });

  describe('User', function () {
    describe('#save()', function () {
      it('should save without error', function (done) {
        const user = new User({ first_name: 'Luna' })
        user.save(done)
      })
    })
  })

  describe('/POST User', () => {
    it('it should not POST a book without pages field', (done) => {
      const user = {
        first_name: 'The Lord',
        last_name: 'Tolkien',
        email: 'yest@gmail.com',
        password: 123456
      }
      chai.request(server)
        .post('/users/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('token')
          // res.body.errors.should.have.property('pages');
          // res.body.errors.pages.should.have.property('kind').eql('required');
          done()
        })
    })
  })
})
