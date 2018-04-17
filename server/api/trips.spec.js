/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Trip = db.model('trips')
const Category = db.model('category')

describe('Trip routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

//Find trips by id route /api/trips/:id
  describe('/api/trips/:id', () => {
    const testTrip = {
        name: 'Game of Thrones',
        location: 'Westeros',
        imageURL: 'https://i.pinimg.com/originals/65/f4/63/65f463be73b23e0a8b4d5ee5afb7d865.jpg',
        price: 700,
        description: 'Come explore the Seven Kingdoms!'
    }

    beforeEach(() => {
      return User.create(testTrip)
    })

    it('gets an individual trip by id', () => {
      return request(app)
        .get('/api/trips')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body[0].name).to.be.equal(testTrip.name)
        })
    })
  }) // end describe('/api/trips/:id')
}) // end describe('Trip routes')
