const router = require('express').Router()
const {Trip, Category} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Trip.findById({
        where: {
            id: id
        }
    })
    .then(trip => res.send(trip))
    .catch(next)
})
