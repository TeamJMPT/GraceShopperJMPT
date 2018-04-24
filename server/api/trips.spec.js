/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Trip = db.model('trip')
const Category = db.model('category')

describe('Trip routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(function () {
    return (
      Trip.truncate({cascade: true})
    )
  })

  //Posts a new trip to the database
  describe('POST /api/trips', () => {
    const newTrip = {
      name: 'PeterPan',
      location: 'Neverland',
      imageUrl: 'https://pro2-bar-s3-cdn-cf4.myportfolio.com/704fa63a255d197dc1c55cce93076ac6/5d5ec30638337bc8aa559c87_rw_1200.png?h=e82d9d97c58a02bda8db0e1230164147',
      price: 1000,
      descrption: 'All you need is faith , trust, and a little pixie dust'
    }

    it('creates a new trip', () => {
      return request(app)
        .post('/api/trips')
        .send(newTrip)
        .expect(200)
        .expect(function(res) {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.equal('PeterPan');
          expect(res.body.location).to.equal('Neverland');
          expect(res.body.imageUrl).to.equal('https://pro2-bar-s3-cdn-cf4.myportfolio.com/704fa63a255d197dc1c55cce93076ac6/5d5ec30638337bc8aa559c87_rw_1200.png?h=e82d9d97c58a02bda8db0e1230164147');
        })
    })

    it('does not create a new trip without location or price', function () {
      return request(app)
      .post('/api/trips')
      .send({
        name: 'Unwanted Trip'
      })
      .expect(500);
    });

    it('saves the trip to the DB', function () {
      return request(app)
      .post('/api/trips')
      .send({
        name: 'Smallville',
        location: 'Texas, US',
        price: 600
      })
      .expect(200)
      .then(function () {
        return Trip.findOne({
          where: { name: 'Smallville' }
        });
      })
      .then(function (foundTrip) {
        expect(foundTrip).to.exist;
        expect(foundTrip.price).to.equal(600);
      });
    });

    it('sends back JSON of the actual created trip, not just the POSTed data', function () {
      return request(app)
      .post('/api/trips')
      .send({
        name: 'Smallville',
        location: 'Texas, US',
        price: 600,
        availability: 'available'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.availability).to.be.an('undefined');
        expect(res.body.createdAt).to.exist;
      });
    })
  })  // end describe('/api/trips')

  //Find a trip by id 
  describe('/api/trips/:id', () => {
    const testTrip = {
        name: 'Game of Thrones',
        location: 'Westeros',
        imageUrl: 'https://i.pinimg.com/originals/65/f4/63/65f463be73b23e0a8b4d5ee5afb7d865.jpg',
        price: 700,
        description: 'Come explore the Seven Kingdoms!'
    }

    beforeEach(() => {
      return Trip.create(testTrip)
    })

    it('gets an individual trip by id', () => {
      return request(app)
        .get('/api/trips/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('Game of Thrones')
        })
    })
  }) 
  
  //Updates a trip
  describe('PUT /api/trips/:id', function () {

    var trip;

    beforeEach(function () {

      return Trip.create({
        name: 'PeterPan',
        location: 'Neverland',
        price: 1000
      })
      .then(function (createdTrip) {
        trip = createdTrip;
      });
    });

    it('updates a trip', function () {
      return request(app)
      .put('/api/trips/' + trip.id)
      .send({
        name: 'TinkerBell'
      })
      .expect(function (res) {
        expect(res.body.id).to.not.be.an('undefined');
        expect(res.body.name).to.equal('TinkerBell');
        expect(res.body.location).to.equal('Neverland');
        expect(res.body.price).to.equal(1000)
      });

    });
  }) // end describe('/api/trips/:id')

}) // end describe('Trip routes')
