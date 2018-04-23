const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const User = require('./db/models/user')
const Order = require('./db/models/order')
// const Cart = require('./db/models/cart')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // //middleware that sets req.cart
  // app.use('/', (req, res, next) => {
  //   console.log("session start: ", req.session);
  //   //if there's already a cart on the session?, go to next middleware
  //   if (req.body.cart) {
  //     console.log("session with a cart: ", req.session)
  //     next()
  //   }
  //   //if req.session.cartId is set, then load that cart as req.cart, and next()
  //   else if (req.session.cartId) {
  //     //In any case, put the cartId on req.session.cartId
  //     req.body.cart.id = req.session.cartId
  //     console.log("session with ",req.session)
  //     next()
  //   }
  //   //create cart or find user who has cart
  //   else {
  //     //    - Is anyone logged in? (is req.user a thing?)
  //     if (req.session.user) {//logged in
  //       //If so, findOrCreate a cart for them
  //       Cart.findOrCreate({
  //         where: {
  //           userId: +req.session.user.id
  //         }
  //       })
  //       .spread((cart, created) => {
  //         if (created) {
  //           //In any case, put the cartId on req.session.cartId
  //           req.body.cart = cart
  //           req.session.cartId = cart.id
  //         }
  //       })
  //     }
  //     if (!req.session.user) {//not logged in
  //       //Otherwise, findOrCreate a cart owned by nobody
  //       Cart.findOrCreate({
  //         where: {
  //           userId: null
  //         }
  //       })
  //       .spread((cart, created) => {
  //         if (created) {
  //           //In any case, put the cartId on req.session.cartId
  //           req.body.cart = cart;
  //           req.session.cartId = cart.id
  //         }
  //       })
  //     }
  //     next()
  //   }
  // })

  app.get('/zsession', (req, res) => res.send(req.session))

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}
