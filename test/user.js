// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()

chai.use(chaiHttp)

describe('Users Apis', () => {
  beforeEach((done) => { // Before each test we empty the database
    User.deleteMany({}, (_err) => {
      done()
    })
  })

  it('it should create new user and return 201', (done) => {
    const user = {
      first_name: 'The Lord',
      last_name: 'Tolkien',
      email: 'test@gmail.com',
      password: 123456
    }
    chai.request(server)
      .post('/api/v1/users/register')
      .send(user)
      .end((_err, res) => {
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        done()
      })
  })

  it('it should return wrong Credentials', (done) => {
    const user = {
      email: 'test@gmail.com',
      password: 123456
    }
    chai.request(server)
      .post('/api/v1/users/login')
      .send(user)
      .end((_err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('message').eql('Invalid Credentials')
        done()
      })
  })

  it('it should return login validation error', (done) => {
    chai.request(server)
      .post('/api/v1/users/login')
      .send({})
      .end((_err, res) => {
        res.should.have.status(422)
        res.body.should.be.a('object')
        res.body.should.have.property('errors').eql([
          {
            msg: 'Invalid email',
            param: 'email',
            location: 'body'
          },
          {
            msg: 'Invalid email',
            param: 'email',
            location: 'body'
          },
          {
            msg: 'password is required',
            param: 'password',
            location: 'body'
          }
        ])
        // res.body.should.have.property('message').eql('Invalid Credentials');
        done()
      })
  })

  it('it should return user confirmation succeeded', async () => {
    const encryptedPassword = await bcrypt.hash('123456', 10)
    User.create({ email: 'test@gmail.com', password: encryptedPassword, confirmation_code: '4567' })
    chai.request(server)
      .get('/api/v1/users/confirm/4567')
      .end((_err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message')
        res.body.should.have.property('message').eql('Your email is activated')
      })
  })
})
