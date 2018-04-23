const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function throwError (status, msg) { // pulling this out to a utils file to be used in many places -- KHLW
	const err = new Error(msg)
	err.status = status
	throw err;
}

function isLoggedIn (req, res, next) {
	if (!req.user) throwError(401, 'Unauthenticated')
	next()
}

router.get('/', isLoggedIn, (req, res, next) => {
	if (!req.user.isAdmin) // throw 403
	next()
}, (req, res, next) => { // only admin should see this -- KHLW
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})
